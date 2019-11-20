/* eslint-disable object-curly-newline */
import ShippingOptionModel from './ShippingOptionModel';
import DeliveryCalendarDateModel from './DeliveryCalendarDateModel';

import { types } from 'mobx-state-tree';

const ShippingOptionsModel = types
  .model('ShippingOptionsModel', {
    selectedOption: types.optional(ShippingOptionModel, { id: '', identifier: '', amount: { value: '14.99', currency: 'USD' }, label: '', selected: false }),
    selectedDate: types.optional(DeliveryCalendarDateModel, {
      baseCharge: '',
      deliveryDate: '',
      deliverySLA: '',
      productSku: '',
    }),
    payType: types.optional(types.string, ''),
    shippingOptions: types.array(ShippingOptionModel),
    shippingDates: types.array(DeliveryCalendarDateModel),
  })
  .views((self) => ({
    get isDefaultShippingSelected() {
      return self.selectedOption && (self.selectedOption.id || self.selectedOption.identifier);
    },
    get selected() {
      if (self.payType === 'gp') {
        const { id, amount, label } = self.selectedOption;
        return {
          id,
          amount,
          label,
        };
      }
      return self.selectedOption.toJSON();
    },
    get paymentRequestShippingOptions() {
      return self.shippingOptions.toJSON();
    },
    get googlePayShippingOptions() {
      const shippingOptions = [];
      self.shippingOptions.forEach((shippingOption) => {
        shippingOptions.push({
          id: shippingOption.id,
          description: shippingOption.detail,
          label: shippingOption.label,
        });
      });
      return shippingOptions;
    },
    get googlePayShippingOptionsMap() {
      const shippingOptionsMap = {};
      self.shippingOptions.forEach((shippingOption) => {
        shippingOptionsMap[shippingOption.id] = shippingOption.amount.value;
      });
      return shippingOptionsMap;
    },
  }))
  .actions((self) => ({
    setShippingOption(selectedOption) {
      if (self.payType === 'pr') {
        self.shippingOptions.forEach((shippingOption) => {
          if (shippingOption.id === selectedOption.id) {
            shippingOption.selected = true;
          } else {
            shippingOption.selected = false;
          }
        });
      }
      self.selectedOption = selectedOption.toJSON();
    },
    setShippingOptionId(id) {
      let selectedOption = {};
      let selectedDate = {};

      if (self.payType === 'pr') {
        self.shippingOptions.forEach((shippingOption) => {
          if (shippingOption.id === id) {
            shippingOption.selected = true;
            selectedOption = shippingOption;
          } else {
            shippingOption.selected = false;
          }
        });
        self.selectedOption = selectedOption.toJSON();
      } else {
        selectedOption = self.shippingOptions.find((shippingOption) => shippingOption.id === id || shippingOption.identifier === id);
        self.selectedOption = selectedOption.toJSON();
      }

      selectedDate = self.shippingDates.find((shippingDate) => {
        const { deliveryDate, deliverySLA, baseCharge, totSurcharge, upCharge } = shippingDate;
        const amount = (+baseCharge + +totSurcharge + +upCharge).toFixed(2);
        const identifierObject = self.getIdentifierObject(deliveryDate, deliverySLA, amount);

        return self.toQueryString(identifierObject) === selectedOption.id;
      });

      console.log('selectedDate in Model', selectedDate);
      self.selectedDate = selectedDate.toJSON();
    },
    setSelectedDate(selectedDate) {
      self.selectedDate = DeliveryCalendarDateModel.create(selectedDate);
    },
    getDeliveryDates(calendarJSON) {
      const { dates } = calendarJSON;
      self.shippingOptions = [];

      dates.forEach((date) => self.addShippingOption(date));

      self.shippingDates = [...dates];

      self.setShippingOption(self.shippingOptions.toJSON()[0]); // By default Selecting first in Array
      self.setSelectedDate(dates[0]); // By default Selecting first in Array

      console.log('shippingOptions', self.shippingOptions);
    },
    addShippingOption(date) {
      // msgType of flex option to use for detail text
      const FLEX_MSG_TYPE = 1;
      const FLEX_SPECIAL_MSG = 1;

      const { deliveryDate, skipFlex, flexDetails, flex, baseCharge, totSurcharge, upCharge } = date;

      // `flexDetails` is part of the calendar response with the different options
      // `flex` will be defined if this method is called from a flex option and is used for order details
      const flexOptions = flexDetails && flexDetails.option ? flexDetails.option : [];

      // add flex option dates if available
      if (flexOptions.length && !skipFlex) {
        flexOptions.forEach((option) => {
          const { flexAmount, flexMsg } = option;
          const msg = flexMsg.find((msg) => Number(msg.msgType) === FLEX_MSG_TYPE);
          const specialMsg = flexMsg.find((msg) => Number(msg.msgType) === FLEX_SPECIAL_MSG);

          self.addShippingOption(Object.assign({}, date, {
            // flex upcharge
            skipFlex: true,
            upCharge: (+upCharge + +flexAmount),
            detail: (msg && msg.msgText) || null,
            flex: Object.assign({ flexSpecialInstructions: (specialMsg && specialMsg.msgText) || null }, option),
          }));
        });

        return;
      }

      let selected = false;

      //  amount: "17.98"
      const showAmount = (+baseCharge + +totSurcharge + +upCharge).toFixed(2);

      //  label: "Friday - Oct 20 2017"
      const label = self.getDeliveryLabel(deliveryDate);

      // identifier
      const { deliverySLA } = date;

      const identifierObject = self.getIdentifierObject(deliveryDate, deliverySLA, showAmount);

      let amount;
      let id;
      let identifier;
      if (self.payType === 'ap') {
        amount = showAmount;
        identifier = self.toQueryString(identifierObject);
      } else {
        amount = {
          value: showAmount,
          currency: 'USD',
        };
        id = self.toQueryString(identifierObject);
      }

      //  detail: "Std. Shipping + $2.99"
      let detail = '';

      if (date.baseCharge !== '0.0') {
        detail = 'Std. Shipping';
        // selected = true; // keeping the logic, just in case we'll need it later on
      }

      if (date.totSurcharge !== '0.0' || date.upCharge !== '0.0') {
        if (detail !== '') { detail = detail.concat(' + '); }
        detail = detail.concat('$', (parseFloat(date.totSurcharge) + parseFloat(date.upCharge)).toFixed(2));
        selected = false;
      } else if (date.baseCharge === '0.0') {
        detail = 'Free Shipping';
        // selected = true; // keeping the logic, just in case we'll need it later on
      }

      // use detail provided from flex message (if available)
      if (date.detail) {
        // eslint-disable-next-line prefer-destructuring
        detail = date.detail;
      }

      if (!self.isDefaultShippingSelected && selected) {
        self.isDefaultShippingSelected = true;
        if (self.shippingOptions.length > 0) {
          // this one's the default, put it first in the list
          self.shippingOptions.unshift({ id, amount, label, detail, identifier, flex });
        }
      } else {
        selected = false;
        // add it to the list of shipping dates
        self.shippingOptions.push({ id, amount, label, detail, identifier, flex });
      }
    },
    /**
     * Create a query string using an object
     *
     * @param {Object} paramsObject recieves object with all parameters
     *
     * @return {String} format of query params
    */
    toQueryString(paramsObject) {
      return Object
        .keys(paramsObject)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
        .join('&');
    },

    /**
     * Converts a date string to Delivery Label
     * @param {String} stringDate an ISO format date string
     *
     * @returns {String} As string as e.g. 'Friday - Oct 28 2018'
    */
    getDeliveryLabel(stringDate) {
      const deliveryDate = new Date(stringDate);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = days[deliveryDate.getDay()];
      const deliveryMonth = deliveryDate.toString().split(' ')[1];
      const deliveryDay = self.getDeliveryDay(stringDate);
      const deliveryYear = self.getDeliveryYear(stringDate);
      return `${dayOfWeek} - ${deliveryMonth} ${deliveryDay} ${deliveryYear}`;
    },

    /**
     * convert date string to day
     *
     * @param {String} stringDate date in string format
     *
     * @return {String}
    */
    getDeliveryDay(stringDate) {
      const deliveryDate = new Date(stringDate);
      return deliveryDate.getDate();
    },

    /**
     * convert date string to month
     *
     * @param {String} stringDate date in string format
     *
     * @return {String}
    */
    getDeliveryMonth(stringDate) {
      const deliveryDate = new Date(stringDate);
      return deliveryDate.getMonth() + 1;
    },

    /**
     * convert date string to year
     *
     * @param {String} stringDate date in string format
     *
     * @return {String}
    */
    getDeliveryYear(stringDate) {
      const deliveryDate = new Date(stringDate);
      return deliveryDate.getFullYear();
    },

    /**
     * Converts a Label to dd-MM-yyyy E.g. 'Friday - Oct 28 2018' to '28-OCT-2018'
     *
     * @param {String} label Displayed date in label format
     *
     * @return {String} date in dd-MM-yyyy
    */
    convertShippingMethodLabelToDeliveryDate(label) {
      const dateString = label.split(' - ').pop();
      const dateChunks = dateString.split(' ');
      return `${dateChunks[1]}-${dateChunks[0].toUpperCase()}-${dateChunks[2].slice(-2)}`;
    },

    /**
     * Finds the shipping option in shipping options array.
     * identifierName for AP and PR is 'identifier' while for GP it is 'id'
     *
     * @param {String} key value of selected shipping identifier
     * @param {Array} shippingOptions list containing all shipping options
     * @param {identifierName} identifierName name of the key that would be used to get the date value
     *
     * @return {Object} of the found shipping option
    */
    getShippingOptionByIdentifier(key, shippingOptions, identifierName = 'identifier') {
      return shippingOptions.find((option) => option[identifierName] === key);
    },

    getIdentifierObject(deliveryDate, deliverySLA, amount) {
      const dDay = self.getDeliveryDay(deliveryDate);
      const dMonth = self.getDeliveryMonth(deliveryDate);
      const dYear = self.getDeliveryYear(deliveryDate);
      return {
        day: dDay,
        month: dMonth,
        year: dYear,
        deliverySLA,
        amount,
      };
    },
  }));

export default ShippingOptionsModel;

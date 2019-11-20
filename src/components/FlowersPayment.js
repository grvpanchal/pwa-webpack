/* eslint-disable object-curly-newline */
import { Component } from 'react';

// import { fetchDeliveryCalendar } from '../../product/model/DeliveryCalendarDialogModel';

import DeliveryCalendarModel from '../models/DeliveryCalendarModel';
// import CheckoutBillingAddressModel from '../../checkout/models/CheckoutBillingAddressModel';

// import { fetchOrderSummary } from '../models/CheckoutOrderSummaryModel';

function fetchDeliveryCalendar() {
  return Promise.resolve({
    "id": "147300L_2019-08-26_2019-09-30",
    "dates": [
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-TWO",
        "productSku": "147300L",
        "totSurcharge": "2.99",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-08-26",
        "surcharges": [
          {
            "amount": "2.99",
            "msgType": "0"
          }
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-08-27",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-08-28",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-08-29",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-08-30",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-NXT",
        "productSku": "147300L",
        "totSurcharge": "12.99",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-08-31",
        "surcharges": [
          {
            "amount": "12.99",
            "msgType": "1"
          }
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-NXT",
        "productSku": "147300L",
        "totSurcharge": "12.99",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-01",
        "surcharges": [
          {
            "amount": "12.99",
            "msgType": "1"
          }
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-02",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-03",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-04",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-05",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-06",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-NXT",
        "productSku": "147300L",
        "totSurcharge": "12.99",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-07",
        "surcharges": [
          {
            "amount": "12.99",
            "msgType": "1"
          }
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-NXT",
        "productSku": "147300L",
        "totSurcharge": "12.99",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-08",
        "surcharges": [
          {
            "amount": "12.99",
            "msgType": "1"
          }
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-09",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-10",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-11",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-12",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-13",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-NXT",
        "productSku": "147300L",
        "totSurcharge": "12.99",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-14",
        "surcharges": [
          {
            "amount": "12.99",
            "msgType": "1"
          }
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-NXT",
        "productSku": "147300L",
        "totSurcharge": "12.99",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-15",
        "surcharges": [
          {
            "amount": "12.99",
            "msgType": "1"
          }
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-16",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-17",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-18",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-19",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-20",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-NXT",
        "productSku": "147300L",
        "totSurcharge": "12.99",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-21",
        "surcharges": [
          {
            "amount": "12.99",
            "msgType": "1"
          }
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-NXT",
        "productSku": "147300L",
        "totSurcharge": "12.99",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-22",
        "surcharges": [
          {
            "amount": "12.99",
            "msgType": "1"
          }
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-23",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-24",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-25",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-26",
        "surcharges": [
  
        ],
        "flexOptions": [
          {
            "optionCode": "9927",
            "flexAmount": "2.99",
            "defaultOption": "Y",
            "flexMsg": {
              "1": "Thurs 10/31 preferred, Wed 10/30 acceptable (no additional charge)",
              "2": "Thurs 10/31 preferred, Wed 10/30 acceptable (no additional charge)",
              "3": "Thurs 10/31 preferred, Wed 10/30 acceptable (no additional charge)",
              "4": "Thurs 10/31 preferred, Wed 10/30 acceptable (no additional charge)",
              "5": "Thurs 10/31 preferred, Wed 10/30 acceptable (no additional charge)",
              "6": "Holiday Delivery Options:<br> -  Flexible Delivery: Oct 30 or July 31",
              "7": "Holiday Delivery"
            },
            "flexDate": "2019-09-25",
            "forcedDelDate": "2019-09-26"
          },
          {
            "optionCode": "9928",
            "flexAmount": "0.0",
            "defaultOption": "N",
            "flexMsg": {
              "1": "Thursday 10/31 delivery (+$2.99)",
              "2": "Delivery on Thursday 10/31",
              "3": "Delivery on Thursday 10/31",
              "4": "Delivery on Thursday 10/31",
              "5": "Delivery on Thursday 10/31",
              "6": "Thursday 10/31 delivery (+$2.99)",
              "7": "Holiday Delivery"
            },
            "flexDate": "2019-09-25",
            "forcedDelDate": "2019-09-25"
          }
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-GND",
        "productSku": "147300L",
        "totSurcharge": "0.0",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-27",
        "surcharges": [
  
        ],
        "flexOptions": [
  
        ]
      },
      {
        "baseCharge": "17.99",
        "deliverySLA": "18F-NXT",
        "productSku": "147300L",
        "totSurcharge": "12.99",
        "upCharge": "0.0",
        "strikeBaseCharge": "0.0",
        "strikeUpCharge": "0.0",
        "strikeSurcharge": "",
        "brandCode": "",
        "holidayCode": [
  
        ],
        "deliveryDate": "2019-09-28",
        "surcharges": [
          {
            "amount": "12.99",
            "msgType": "1"
          }
        ],
        "flexOptions": [
  
        ]
      }
    ],
    "layout": [
      {
        "type": "month",
        "month": "August",
        "year": "2019"
      },
      {
        "type": "week",
        "placeholders": [
          0,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      },
      {
        "type": "month",
        "month": "September",
        "year": "2019"
      },
      {
        "type": "week",
        "placeholders": [
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      },
      {
        "type": "week",
        "placeholders": [
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      },
      {
        "type": "week",
        "placeholders": [
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      },
      {
        "type": "week",
        "placeholders": [
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      },
      {
        "type": "week",
        "placeholders": [
          "2019-09-29",
          "2019-09-30",
          0,
          0,
          0,
          0,
          0
        ]
      }
    ]
  }
  );
}

function fetchOrderSummary() {
  return Promise.resolve({
    totals:{
      "merchandise": "87.98",
      "merchandiseOriginal": "109.97",
      "shippingCharge": "19.98",
      "taxCharge": "9.32",
      "total": "117.28",
      "totalDiscount": "21.99"
  }
  });
}

export default class FlowersPayment extends Component {
  constructor() {
    super();
    this.total = this.promoDiscount = this.shipping = this.tax = 0.00;
    this.payType = '';
  }

  getSubtotal(product) {
    const { skuListPrice, skuOfferPrice } = product.selectedSku;
    let total = skuOfferPrice;
    if (skuListPrice === skuOfferPrice) {
      total -= this.promoDiscount;
    }
    return total;
  }

  updateTotals(details, shippingOptions, shippingMethod, product) {
    const paymentRequestLineItem = (label, currency, value) => {
      return {
        label,
        amount: {
          currency,
          value,
        },
      };
    };

    const subtotal = this.getSubtotal(product);

    details.shippingOptions = shippingOptions;
    details.total = paymentRequestLineItem('Pay 1800FLOWERS.COM', 'USD', Number(this.total || '0.00').toFixed(2));
    details.displayItems = [paymentRequestLineItem('Merchandise', 'USD', Number(subtotal || '0.00').toFixed(2))];

    const taxObj = paymentRequestLineItem('Tax', 'USD', Number(this.tax || '0.00').toFixed(2));

    if (shippingMethod) {
      details.displayItems.splice(details.displayItems.length, 0, shippingMethod);
      details.displayItems.splice(details.displayItems.length, 0, taxObj);
    }
  }

  async getShippingOptions({ zipCode, country, product, isPassport }) {
    const { productSku, skuCode, backupSku } = product.selectedSku;
    const brandCode = skuCode.substr(0, 4);

    const params = {
      productSku,
      zipCode,
      locationType: '1',
      brandCode,
      country,
      passport: isPassport,
      backupSku: backupSku || '',
    };

    this.deliveryDateQuery = { ...params };

    const calendarResponse = await fetchDeliveryCalendar(params);

    return DeliveryCalendarModel.create(calendarResponse);
  }

  /**
   * Order Summary Line Item Information. Collect the shipping and tax response
   *
   * @param {Object} params contains cart items and passport info
   *
   * @return {Promise<Response>} returns the response of API Call
  */
  async getShippingAndTaxInformation(params) {
    const shippingAndTax = await fetchOrderSummary(params);
    return shippingAndTax;
  }

  setShippingAndTax(data) {
    this.merchandise = data.totals.merchandise;
    this.shipping = data.totals.shippingCharge;
    this.tax = data.totals.taxCharge;
    this.total = data.totals.total;
  }

  /**
   * Gets card network name based on the number of card
   * @param {Number} CardNum Accepts number credit/debit card
   *
   * @return two digit short name
  */
  getCardType(cardNum) {
    // start without knowing the credit card type
    let result = 'unknown';

    if (/^5[1-5]/.test(cardNum)) { // first check for MasterCard
      result = 'MC';
    } else if (/^4[0-9]/.test(cardNum)) { // then check for Visa
      result = 'VI';
    } else if (/^3[47]/.test(cardNum)) { // then check for AmEx
      result = 'AX';
    } else if (/^6(?:011|5[0-9]{2})/.test(cardNum)) { // then discover
      result = 'DI';
    } else if (/^3(?:0[0-5]|[68][0-9])/.test(cardNum)) { // then diners club
      result = 'DC';
    }

    return result;
  }

  /**
   * Converts card network name to 2 letter short name
   * @param {String} networkName Accepts network full name in one word
   *
   * @return {String} two digit short name
  */
  getCardTypeShortName(networkName) {
    const cardTypes = {
      amex: 'AX',
      discover: 'DI',
      mastercard: 'MC',
      visa: 'VI',
      diners: 'DC',
    };

    return cardTypes[networkName.toLowerCase()];
  }

  /**
   * Converts card 2 letter short name to Long network name
   * @param {String} ccType Accepts network 2 digit name
   *
   * @return {String} two digit short name
  */
  getCardTypeName(ccType) {
    let cardType = '';
    switch (ccType) {
      case 'VI':
        cardType = 'VISA';
        break;
      case 'MC':
        cardType = 'Master Card';
        break;
      case 'AX':
        cardType = 'AMEX';
        break;
      case 'DI':
        cardType = 'Discover';
        break;
      case 'DC':
        cardType = 'Diners';
        break;
      default:
    }

    return cardType;
  }

  collectBillingAddress(billingAddress) {
    return CheckoutBillingAddressModel.create(billingAddress);
  }

  clearPDPCheckoutCart(cart) {
    if (cart.items.length) { cart.removeProduct(cart.items[0].id); }
  }

  buildPDPCheckoutCart({ cart, shippingAddress, product, selectedDate }) {
    let firstItem = 'items' in cart && cart.items.length && cart.items[0];
    const { productSku } = product.selectedSku;

    if (!cart.items.length) {
      cart.addProduct({
        product: product.detail,
        productSku,
        deliveryDate: selectedDate,
        deliveryZipCode: shippingAddress.zipCode,
        deliveryLocationType: '1',
        shippingAddress,
      });

      firstItem = cart.items[0];
    } else if (shippingAddress || selectedDate) {
      if (shippingAddress) {
        firstItem.changeShippingAddress(shippingAddress);
      }
      if (selectedDate) {
        const { deliveryDateQuery } = this;
        firstItem.changeDeliveryDate(selectedDate, deliveryDateQuery);
      }
    }

    return [firstItem.toLineItem()];
  }

  loadScriptAsync(url, idName) {
    // eslint-disable-next-line consistent-return
    return new Promise((resolve, reject) => {
      if (document.getElementById(idName) !== null) { return resolve(); }
      const tag = document.createElement('script');
      tag.src = url;
      tag.id = idName;
      tag.async = true;
      tag.onload = resolve;
      tag.onerror = () => {
        document.getElementById(idName).innerHTML = null;
        reject();
      };

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });
  }
}

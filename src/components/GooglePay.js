/* eslint-disable object-curly-newline */
import React from 'react';

import { withStyles } from '@material-ui/core';
import FlowersPayment from './FlowersPayment';

import getSplittedName from '../helpers/getSplittedName';

import ShippingOptionsModel from '../models/ShippingOptionsModel';

const ShippingMethod = ShippingOptionsModel.create({ payType: 'gp' });

const googlePay = {
  merchantIdentifier: '16774908510352561824',
  merchantName: '1800FLOWERS.COM',
  src: 'https://payments.developers.google.com/js/apis/pay.js',
  mode: 'TEST',
  stripePublic: 'pk_test_8lrlIQVBAC5lhc8elColaSYG',
  stripeVersion: '2016-03-07',
};

@withStyles({
  root: {
    display: 'block',
  },
  button: {
    'textAlign': 'center',
    '& .gpay-button.long.white': {
      width: '100%',
    },
  },
})

export default class GooglePay extends FlowersPayment {
  render() {
    const { classes, buttonId } = this.props;

    return (
      <div className={classes.root}>
        <div id={`googlePayBtn${buttonId}`} className={classes.button} />
      </div>
    );
  }

  constructor() {
    super();
    /**
     * Define the version of the Google Pay API referenced when creating your
     * configuration
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/object#PaymentDataRequest|apiVersion in PaymentDataRequest}
    */
    this.baseRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
    };

    /**
     * Card networks supported by your site and your gateway
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/object#CardParameters|CardParameters}
     * @todo confirm card networks supported by your site and gateway
    */
    const allowedCardNetworks = ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'];

    /**
     * Card authentication methods supported by your site and your gateway
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/object#CardParameters|CardParameters}
     * @todo confirm your processor supports Android device tokens for your
     * supported card networks
    */
    const allowedAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

    /**
     * Identify your gateway and your site's gateway merchant identifier
     *
     * The Google Pay API response will return an encrypted payment method capable
     * of being charged by a supported gateway after payer authorization
     *
     * @todo check with your gateway on the parameters to pass
     * @see {@link https://developers.google.com/pay/api/web/reference/object#Gateway|PaymentMethodTokenizationSpecification}
    */
    const tokenizationSpecification = {
      type: 'PAYMENT_GATEWAY',
      parameters: {
        'gateway': 'stripe',
        'stripe:publishableKey': googlePay.stripePublic,
        'stripe:version': googlePay.stripeVersion,
      },
    };

    /**
     * Describe your site's support for the CARD payment method and its required
     * fields
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/object#CardParameters|CardParameters}
     */
    this.baseCardPaymentMethod = {
      type: 'CARD',
      parameters: {
        allowedAuthMethods,
        allowedCardNetworks,
        billingAddressRequired: true,
        billingAddressParameters: {
          format: 'FULL',
          phoneNumberRequired: true,
        },
      },
    };

    /**
     * Describe your site's support for the CARD payment method including optional
     * fields
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/object#CardParameters|CardParameters}
     */
    this.cardPaymentMethod = Object.assign({}, this.baseCardPaymentMethod, { tokenizationSpecification });

    /**
     * An initialized google.payments.api.PaymentsClient object or null if not yet set
     *
     * @see {@link getGooglePaymentsClient}
    */
    this.paymentsClient = null;
  }

  componentDidMount() {
    this.loadScriptAsync(googlePay.src, 'gpay-sdk')
      .then(() => this.onGooglePayLoaded());
  }

  /**
   * Configure your site's support for payment methods supported by the Google Pay
   * API.
   *
   * Each member of allowedPaymentMethods should contain only the required fields,
   * allowing reuse of this base request when determining a viewer's ability
   * to pay and later requesting a supported payment method
   *
   * @returns {object} Google Pay API version, payment methods supported by the site
  */
  getGoogleIsReadyToPayRequest() {
    const { baseCardPaymentMethod, baseRequest } = this;
    return Object.assign(
      {},
      baseRequest,
      {
        allowedPaymentMethods: [baseCardPaymentMethod],
      },
    );
  }

  /**
   * Configure support for the Google Pay API
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|PaymentDataRequest}
   * @returns {object} PaymentDataRequest fields
  */
  getGooglePaymentDataRequest() {
    const paymentDataRequest = Object.assign({}, this.baseRequest);
    paymentDataRequest.allowedPaymentMethods = [this.cardPaymentMethod];
    this.merchandise = this.props.isCheckout ? this.merchandise : this.getSubtotal(this.props.product);
    paymentDataRequest.transactionInfo = this.getTransactionInfo(this.merchandise, 0, 0, this.total || this.merchandise);
    paymentDataRequest.merchantInfo = {
      // @todo a merchant ID is available for a production environment after approval by Google
      // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
      merchantId: googlePay.merchantIdentifier,
      merchantName: googlePay.merchantName,
    };

    paymentDataRequest.emailRequired = true;

    if (this.props.isCheckout) {
      paymentDataRequest.shippingOptionRequired = false;
      paymentDataRequest.shippingAddressRequired = false;
      paymentDataRequest.callbackIntents = ['PAYMENT_AUTHORIZATION'];
    } else {
      paymentDataRequest.callbackIntents = ['SHIPPING_ADDRESS', 'SHIPPING_OPTION', 'PAYMENT_AUTHORIZATION'];
      paymentDataRequest.shippingOptionRequired = true;
      paymentDataRequest.shippingAddressRequired = true;
      paymentDataRequest.shippingAddressParameters = this.getGoogleShippingAddressParameters();
      paymentDataRequest.shippingOptionParameters = this.getGoogleDefaultShippingOptions();
    }
    return paymentDataRequest;
  }

  /**
   * Return an active PaymentsClient or initialize
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient|PaymentsClient constructor}
   * @returns {google.payments.api.PaymentsClient} Google Pay API client
  */
  getGooglePaymentsClient() {
    let { paymentsClient, onPaymentDataChanged } = this;
    const { onPaymentAuthorized } = this;
    onPaymentDataChanged = this.props.isCheckout ? undefined : onPaymentDataChanged.bind(this);

    if (paymentsClient === null) {
      paymentsClient = new google.payments.api.PaymentsClient({
        environment: googlePay.mode,
        merchantInfo: {
          merchantName: googlePay.merchantName,
          merchantId: googlePay.merchantIdentifier,
        },
        paymentDataCallbacks: {
          onPaymentAuthorized: onPaymentAuthorized.bind(this),
          onPaymentDataChanged,
        },
      });
    }
    return paymentsClient;
  }

  /**
   * Handles authorize payments callback intents.
   *
   * @param {object} paymentData response from Google Pay API after a payer approves payment through user gesture.
   * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData object reference}
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentAuthorizationResult}
   * @returns Promise<{object}> Promise of PaymentAuthorizationResult object to acknowledge the payment authorization status.
  */
  onPaymentAuthorized(paymentData) {
    return new Promise((resolve) => {
      // handle the response
      this.initPayment(paymentData)
        .then(() => resolve({ transactionState: 'SUCCESS' }))
        .catch(() => {
          resolve({
            transactionState: 'ERROR',
            error: {
              intent: 'PAYMENT_AUTHORIZATION',
              message: 'Insufficient funds',
              reason: 'PAYMENT_DATA_INVALID',
            },
          });
        });
    });
  }

  /**
   * Handles dynamic buy flow shipping address and shipping options callback intents.
   *
   * @param {object} itermediatePaymentData response from Google Pay API a shipping address or shipping option is selected in the payment sheet.
   * @see {@link https://developers.google.com/pay/api/web/reference/object#IntermediatePaymentData|IntermediatePaymentData object reference}
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/object#PaymentDataRequestUpdate|PaymentDataRequestUpdate}
   * @returns Promise<{object}> Promise of PaymentDataRequestUpdate object to update the payment sheet.
  */
  onPaymentDataChanged(intermediatePaymentData) {
    // eslint-disable-next-line consistent-return
    return new Promise((resolve) => {
      const { shippingAddress, shippingOptionData, callbackTrigger } = intermediatePaymentData;
      const paymentDataRequestUpdate = {};
      console.log('callbackTrigger', callbackTrigger);

      if (callbackTrigger === 'SHIPPING_ADDRESS' || callbackTrigger === 'INITIALIZE') {
        this.updateShippingAddress(shippingAddress)
          .then((res) => {
            paymentDataRequestUpdate.newShippingOptionParameters = res;
            const selectedShippingOptionId = paymentDataRequestUpdate.newShippingOptionParameters.defaultSelectedOptionId;
            paymentDataRequestUpdate.newTransactionInfo = this.calculateNewTransactionInfo(selectedShippingOptionId);
            return resolve(paymentDataRequestUpdate);
          })
          .catch((e) => {
            console.log(e);
            paymentDataRequestUpdate.error = this.getGoogleUnserviceableAddressError('SHIPPING_ADDRESS');
            return resolve(paymentDataRequestUpdate);
          });
      } else if (callbackTrigger === 'SHIPPING_OPTION') {
        this.updateShippingOptions(shippingOptionData.id)
          .then(() => {
            paymentDataRequestUpdate.newTransactionInfo = this.calculateNewTransactionInfo(shippingOptionData.id);
            return resolve(paymentDataRequestUpdate);
          })
          .catch(() => {
            paymentDataRequestUpdate.error = this.getGoogleUnserviceableAddressError('SHIPPING_OPTION');
            return resolve(paymentDataRequestUpdate);
          });
      } else {
        paymentDataRequestUpdate.newShippingOptionParameters = this.getGoogleDefaultShippingOptions();
        return resolve(paymentDataRequestUpdate);
      }
    });
  }

  /**
   * Helper function to create a new TransactionInfo object.
   *
   * @param string shippingOptionId respresenting the selected shipping option in the payment sheet.
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/object#TransactionInfo|TransactionInfo}
   * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
  */
  calculateNewTransactionInfo(shippingOptionId) {
    const shippingCost = this.getShippingCosts()[shippingOptionId];
    const newTransactionInfo = this.getTransactionInfo(this.getSubtotal(this.props.product), Number(shippingCost), Number(this.tax), this.total || this.getSubtotal(this.props.product));

    newTransactionInfo.totalPrice = this.total;
    return Object.assign({}, newTransactionInfo);
  }

  /**
   * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
   *
   * Display a Google Pay payment button after confirmation of the viewer's
   * ability to pay.
  */
  onGooglePayLoaded() {
    const paymentsClient = this.getGooglePaymentsClient();
    paymentsClient.isReadyToPay(this.getGoogleIsReadyToPayRequest())
      .then((response) => {
        if (response.result) { this.addGooglePayButton(); }
      })
      .catch((err) => console.error(err));
  }


  /**
   * Provide Google Pay API with a payment amount, currency, and amount status
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/object#TransactionInfo|TransactionInfo}
   * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
  */
  getTransactionInfo(merchTotal = 0, shipping = 0, tax = 0, orderTotal = 0) {
    const isPreCalculatedCheckout = this.props.isCheckout;

    return {
      displayItems: [
        {
          label: 'Subtotal',
          type: 'SUBTOTAL',
          price: merchTotal.toString(),
        },
        {
          label: 'Tax',
          type: 'TAX',
          price: tax.toString(),
          status: isPreCalculatedCheckout || Number(tax) > 0 ? 'FINAL' : 'PENDING',
        },
        {
          label: 'Shipping',
          type: 'LINE_ITEM',
          price: shipping.toString(),
          status: isPreCalculatedCheckout || Number(shipping) > 0 ? 'FINAL' : 'PENDING',
        },
      ],
      currencyCode: 'USD',
      totalPriceStatus: isPreCalculatedCheckout || (Number(tax) > 0 && Number(shipping) > 0) ? 'FINAL' : 'ESTIMATED',
      totalPrice: orderTotal.toString(),
      totalPriceLabel: 'Total',
    };
  }

  /**
   * Provide a key value store for shippping options.
  */
  getShippingCosts() {
    return ShippingMethod.googlePayShippingOptionsMap || {
      'day=16&month=11&year=2019&deliverySLA=18F-NXT&amount=14.99': '14.99',
    };
  }

  /**
   * Provide Google Pay API with shipping address parameters when using dynamic buy flow.
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ShippingAddressParameters|ShippingAddressParameters}
   * @returns {object} shipping address details, suitable for use as shippingAddressParameters property of PaymentDataRequest
   */
  getGoogleShippingAddressParameters() {
    return {
      allowedCountryCodes: ['US'],
      phoneNumberRequired: true,
    };
  }

  /**
   * Provide Google Pay API with shipping options and a default selected shipping option.
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ShippingOptionParameters|ShippingOptionParameters}
   * @returns {object} shipping option parameters, suitable for use as shippingOptionParameters property of PaymentDataRequest
  */
  getGoogleDefaultShippingOptions() {
    return {
      defaultSelectedOptionId: 'day=16&month=11&year=2019&deliverySLA=18F-NXT&amount=14.99',
      shippingOptions: [
        {
          id: 'day=16&month=11&year=2019&deliverySLA=18F-NXT&amount=14.99',
          label: 'Saturday - Nov 16 2019',
          description: 'Std. Shipping',
        },
      ],
    };
  }


  /**
   * Provide Google Pay API with a payment data error.
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/object#PaymentDataError|PaymentDataError}
   * @returns {object} payment data error, suitable for use as error property of PaymentDataRequestUpdate
  */
  getGoogleUnserviceableAddressError(intent) {
    return {
      reason: 'SHIPPING_ADDRESS_UNSERVICEABLE',
      message: 'Cannot ship to the selected address',
      intent,
    };
  }

  /**
 * Add a Google Pay purchase button alongside an existing checkout button
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions|Button options}
 * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines|Google Pay brand guidelines}
 */
  addGooglePayButton() {
    const { buttonId } = this.props;
    const buttonType = 'long';
    const paymentsClient = this.getGooglePaymentsClient();
    const button = paymentsClient.createButton({
      onClick: this.onGooglePaymentButtonClicked.bind(this),
      buttonColor: 'white',
      buttonType,
    });
    document.getElementById(`googlePayBtn${buttonId}`).appendChild(button);
  }

  /**
   * Prefetch payment data to improve performance
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
   */
  prefetchGooglePaymentData() {
    const paymentDataRequest = this.getGooglePaymentDataRequest();
    // transactionInfo must be set but does not affect cache
    paymentDataRequest.transactionInfo = {
      totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
      currencyCode: 'USD',
    };
    const paymentsClient = this.getGooglePaymentsClient();
    paymentsClient.prefetchPaymentData(paymentDataRequest);
  }

  /**
   * Show Google Pay payment sheet when Google Pay payment button is clicked
  */
  onGooglePaymentButtonClicked() {
    const paymentDataRequest = this.getGooglePaymentDataRequest();

    const { isCheckout, checkout, cart } = this.props;
    if (isCheckout) {
      const { totals } = checkout.summary.current.details;
      this.setShippingAndTax({ totals });
      paymentDataRequest.transactionInfo = this.getTransactionInfo(this.merchandise, this.shipping, this.tax, this.total);
    } else {
      paymentDataRequest.transactionInfo = this.getTransactionInfo();
    }

    const paymentsClient = this.getGooglePaymentsClient();
    paymentsClient.loadPaymentData(paymentDataRequest)
      .catch((err) => {
        console.log('loadPaymentData Status', err);
        if (!isCheckout) { this.clearPDPCheckoutCart(cart); }
      });
  }

  updateShippingAddress(addr) {
    return new Promise((resolve, reject) => {
      const details = {};
      // If there's no shipping options for the address, it will be rejected on an empty array
      details.shippingOptions = [];

      this.zipCode = addr.postalCode;
      this.state = addr.administrativeArea;
      this.country = addr.country;

      const { product, cart } = this.props;
      const { zipCode, country } = this;

      const shippingOptionsDetail = {
        product,
        zipCode,
        country,
        isPassport: false,
      };

      this.getShippingOptions(shippingOptionsDetail)
        .then((response) => {
          ShippingMethod.getDeliveryDates(response.toJSON());
          details.shippingOptions = ShippingMethod.googlePayShippingOptions;
          details.defaultSelectedOptionId = ShippingMethod.selected.id;

          if (!details.shippingOptions.length) {
            throw new Error('Not available');
          }

          const shippingAddress = this.getMappedAddress(addr);
          const { selectedDate } = ShippingMethod;

          const sntDetails = {
            items: this.buildPDPCheckoutCart({ cart, shippingAddress, product, selectedDate }),
            passport: false,
          };

          return this.getShippingAndTaxInformation(sntDetails);
        })
        .then((response) => {
          this.setShippingAndTax(response);
          resolve(details);
        })
        .catch((error) => {
          delete details.shippingOptions;
          reject(error);
        });
    });
  }

  updateShippingOptions(id) {
    return new Promise((resolve, reject) => {
      const { product, cart } = this.props;

      const details = {};

      details.shippingOptions = this.updateSelectedShippingOption(id);

      const { selectedDate } = ShippingMethod;

      console.log(selectedDate);

      const sntDetails = {
        items: this.buildPDPCheckoutCart({ cart, product, selectedDate }),
        passport: false,
      };

      this.getShippingAndTaxInformation(sntDetails)
        .then((response) => {
          this.setShippingAndTax(response);
          resolve(details);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  updateSelectedShippingOption(id) {
    ShippingMethod.setShippingOptionId(id);
    return ShippingMethod.googlePayShippingOptions;
  }


  /**
   * Process payment data returned by the Google Pay API
   *
   * @param {object} paymentData response from Google Pay API after user approves payment
   * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData|PaymentData object reference}
  */
  initPayment(paymentData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // show returned data in developer console for debugging
        const { checkout, isCheckout } = this.props;

        if (!isCheckout) {
          checkout.paymentMethodChangeHandler('GP');
          this.updatePaymentShipping(paymentData);
        }

        const paymentInfo = { googlePay: paymentData };

        checkout.submitOrder(paymentInfo);
        if (!isCheckout) { checkout.paymentMethodChangeHandler('CC'); }
        const paymentToken = paymentData.paymentMethodData.tokenizationData.token;

        resolve(paymentToken);
      }, 300);
    });
  }

  // eslint-disable-next-line lodash/prefer-constant
  static get isSupported() {
    return true;
  }

  getMappedAddress(address, email) {
    const {
      name,
      address1,
      address2,
      locality,
      administrativeArea,
      postalCode,
      countryCode,
      phoneNumber,
    } = address;

    const { firstName, lastName } = getSplittedName(name);

    return {
      firstName,
      lastName,
      locationType: '1',
      organization: '',
      addressLine1: address1,
      addressLine2: address2 || '',
      city: locality,
      state: administrativeArea,
      zipCode: postalCode,
      country: countryCode,
      phone: phoneNumber,
      email,
    };
  }

  updatePaymentShipping(instrument) {
    const { cart, product } = this.props;
    const shippingAddress = this.getMappedAddress(instrument.shippingAddress);
    this.buildPDPCheckoutCart({ cart, shippingAddress, product });
  }
}

import find from 'lodash/find';
import { types } from 'mobx-state-tree';

export const DeliveryCalendarDtwModel = types
  .model('DeliveryCalendarDtwModel', {
    dtwId: types.string,
    amount: types.optional(types.string, '0.0'),
    expiration: types.optional(types.string, '0'),
    name: types.string,
    startTime: types.optional(types.string, '0'),
  })
  .views((self) => ({
    get displayName() {
      return self.name.replace('Delivery', '');
    },
    get flexOptionMessage() {
      return self.flexMsg.get('1');
    },
  }));

export const DeliveryCalendarDateSurchargeModel = types
  .model('DeliveryCalendarDateSurchargeModel', {
    amount: types.optional(types.string, '0.0'),
    msgType: types.optional(types.string, '0'),
  });

export const DeliveryCalendarDateFlexOptionModel = types
  .model('DeliveryCalendarDateFlexOptionModel', {
    optionCode: types.string,
    flexAmount: types.optional(types.string, '0.0'),
    defaultOption: types.optional(types.string, 'N'),
    flexMsg: types.map(types.string),
    flexDate: types.string,
    forcedDelDate: types.maybeNull(types.string),
  })
  .views((self) => {
    return ({
      get flexAmountFloat() {
        return Number(self.flexAmount);
      },
      get flexOptionMessage() {
        return self.flexMsg.get('1');
      },
      get flexCheckoutOptionMessage() {
        return self.flexMsg.get('2');
      },
    });
  });

const DeliveryCalendarDateModel = types
  .model('DeliveryCalendarDateModel', {
    baseCharge: types.string,
    deliveryDate: types.string,
    deliverySLA: types.string,
    productSku: types.string,
    totSurcharge: types.optional(types.string, '0.0'),
    upCharge: types.optional(types.string, '0.0'),
    strikeBaseCharge: types.optional(types.string, '0.0'),
    strikeUpCharge: types.optional(types.string, '0.0'),
    strikeSurcharge: types.optional(types.string, '0.0'),
    brandCode: types.maybeNull(types.string),
    surcharges: types.array(DeliveryCalendarDateSurchargeModel),
    flexOptions: types.array(DeliveryCalendarDateFlexOptionModel),
  })
  .views((self) => {
    return ({
      get hasSurge() {
        return self.surcharges.length > 0 || self.upCharge !== '0.0';
      },
      get hasFlex() {
        return self.flexOptions.length > 0;
      },
      get hasOneFlexOption() {
        return self.flexOptions.length === 1;
      },
      get flexDefaultOption() {
        const sameDateOption = self.flexOptions.find(({ forcedDelDate }) => forcedDelDate === self.deliveryDate);
        if (!sameDateOption) {
          if (self.flexOptions.length > 0) {
            return self.flexOptions[0];
          }

          return null;
        }

        return sameDateOption;
      },
      get flexTitle() {
        return self.flexDefaultOption && self.flexDefaultOption.flexMsg.get('7');
      },
      flexOptionByCode(optionCode) {
        return find(self.flexOptions, { optionCode });
      },
      get chargeAmount() {
        if (self.hasFlex) {
          if (self.flexDefaultOption && self.flexDefaultOption.flexAmountFloat > self.totSurchargeFloat) {
            return self.flexDefaultOption.flexAmountFloat;
          }

          return self.totSurchargeFloat;
        }
        if (self.hasSurge) {
          return self.totSurchargeFloat + self.upChargeFloat;
        }

        return self.baseCharge;
      },
      get chargeAmountDisplayText() {
        return self.chargeAmount < 0 ? `-$${Math.abs(self.chargeAmount).toFixed(2)}` : `+$${self.chargeAmount}`;
      },
      get totSurchargeFloat() {
        return Number(self.totSurcharge);
      },
      get upChargeFloat() {
        return Number(self.upCharge);
      },
    });
  });

export default DeliveryCalendarDateModel;

import { types } from 'mobx-state-tree';

const ShippingOptionModel = types
  .model('ShippingOptionModel', {
    id: types.optional(types.string, ''),
    detail: types.optional(types.string, ''),
    identifier: types.optional(types.string, ''),
    amount: types.model({ value: '15.00', currency: 'USD' }),
    label: types.optional(types.string, ''),
    selected: types.optional(types.boolean, false),
  });

export default ShippingOptionModel;

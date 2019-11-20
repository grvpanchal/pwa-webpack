import uniqueId from 'lodash/uniqueId';
import { types } from 'mobx-state-tree';
import DeliveryCalendarDateModel from './DeliveryCalendarDateModel';

const DeliveryCalendarModel = types
  .model('DeliveryCalendarModel', {
    id: types.identifier,
    dates: types.optional(types.array(DeliveryCalendarDateModel), []),
    layout: types.optional(types.maybeNull(types.frozen()), null),
  })
  .views((self) => {
    return ({
      get isEmpty() {
        return self.dates.length === 0;
      },
      get layoutWithDates() {
        let lastDateIndex = 0;

        return self.layout.map((pos) => {
          if (pos.type === 'week') {
            return {
              key: uniqueId('week_'),
              ...pos,
              placeholders: pos.placeholders.map((placeholder) => {
                if (placeholder === 1) {
                  return { key: uniqueId('date_'), date: self.dates[lastDateIndex++] };
                }

                return { key: uniqueId('date_'), date: placeholder };
              }),
            };
          }

          return {
            ...pos,
            key: uniqueId('week_'),
          };
        });
      },
      get layoutLegend() {
        let hasStandardDelivery = false;
        let hasUnavailableDelivery = false;
        let hasFlexDelivery = false;
        let hasSurgeDelivery = false;

        for (const date of self.dates) {
          if (date.hasSurge) {
            hasSurgeDelivery = true;
          } else if (date.hasFlex) {
            hasFlexDelivery = true;
          } else {
            hasStandardDelivery = true;
          }
        }

        for (const item of self.layout) {
          if (item.type === 'week') {
            for (const placeholder of item.placeholders) {
              if (placeholder !== 0 && placeholder !== 1) {
                hasUnavailableDelivery = true;
                break;
              }
            }
          }
        }

        return {
          hasStandardDelivery,
          hasUnavailableDelivery,
          hasSurgeDelivery,
          hasFlexDelivery,
        };
      },
      get lastDate() {
        const lastDate = self.dates[self.dates.length - 1];
        return lastDate.deliveryDate;
      },
    });
  });

export default DeliveryCalendarModel;

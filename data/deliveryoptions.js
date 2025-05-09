import dayjs from '../libs/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    // console.log(deliveryOptionId)
    if (parseInt(option.id) === parseInt(deliveryOptionId)) {
      // console.log(deliveryOptionId)
      deliveryOption = option;
    }
  });
  
  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      return dateString || 'Friday, December 22';
}
import { cart } from '../../data//carts.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryoptions.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    // console.log(deliveryOption)
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents =  productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
}
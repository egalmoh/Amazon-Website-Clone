import { updateCartQuantity } from "../amazon.js";

export function renderCheckoutHeader() {
  const checkoutHeaderHTML = `
    <div>
      Checkout (<a class="return-to-home-link js-home-link"
      href="index.html">${updateCartQuantity()}</a>)
    </div>
  `
  document.querySelector('.js-checkout-header')
    .innerHTML = checkoutHeaderHTML;
}
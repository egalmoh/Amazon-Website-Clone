import { getProduct, loadProductsFetch} from '../data/products.js';
import { cart } from '../data/cart-class.js';

const url = new URL(window.location.href);
console.log(url.searchParams.get('orderId'));
console.log(url.searchParams.get('productId'));
console.log(url.searchParams.get('deliveryTime'));
console.log(url.searchParams.get('quantity'));

const productId = url.searchParams.get('productId');
const estimatedDeliveryTime = url.searchParams.get('deliveryTime')
const quantity = url.searchParams.get('quantity')


async function renderOrders() {
  console.log('Fetching products...');
  await loadProductsFetch();

  const matchingProduct = getProduct(productId);
  console.log(matchingProduct)

  // const matchingCartProduct = getCartProduct(productId);
  // console.log(matchingCartProduct)

  const date = new Date(estimatedDeliveryTime);
  const readableDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${readableDate}
    </div>

    <div class="product-info">
      ${matchingProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${quantity}
    </div>

    <img class="product-image" src="${matchingProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
};


document.addEventListener('DOMContentLoaded', () => {
  renderOrders();
});


// function getCartProduct(productId) {
//   let matchingCartProduct;
//   cart.cartItems.forEach(product => {
//     if (productId === product.productId) {
//       matchingCartProduct = product;
//       console.log(product)
//     }
//   });

//   console.log(cart.cartItems)

//   return matchingCartProduct;
// }
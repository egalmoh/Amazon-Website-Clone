import { getProduct, loadProductsFetch} from '../data/products.js';
import { cart } from '../data/cart-class.js';
import { updateCartQuantity } from './amazon.js';
import { orders } from './orders.js'

const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId')
const productId = url.searchParams.get('productId');
const estimatedDeliveryTime = url.searchParams.get('deliveryTime')
const quantity = url.searchParams.get('quantity')
console.log(orderId)


async function renderOrders() {
  console.log('Fetching products...');
  await loadProductsFetch();

  const matchingProduct = getProduct(productId);

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

    ${progressBar()}
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
};

function progressBar() {

  console.log('hello')

  let progressBarHTML = '';
  
  let orderTime;

  orders.forEach(order => {
    if (orderId === order.id) {
      orderTime = order.orderTime;
    }
  });

  const currentTime = new Date(); // Current time
  const deliveryTime = new Date(estimatedDeliveryTime); // Delivery time from URL
  orderTime = new Date(orderTime);  // Order time


  const percentProgress = Math.min(Math.max(((currentTime.getTime() - orderTime.getTime()) / (deliveryTime.getTime() - orderTime.getTime())) * 100, 0), 100); // Ensure percentage is between 0 and 100
  console.log(percentProgress )

  if (percentProgress >= 0 && percentProgress <= 49) {
    progressBarHTML = `
      <div class="progress-labels-container">
        <div class="progress-label current-status">
          Preparing
        </div>
        <div class="progress-label">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width:${percentProgress}%;"></div>
      </div>
    `
  } else if (percentProgress >= 50 && percentProgress <= 99) {
    progressBarHTML = `
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
        <div class="progress-bar" style="width:width:${percentProgress}%;"></div>
      </div>
    `
  } else if (percentProgress === 100) {
    progressBarHTML = `
      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label">
          Shipped
        </div>
        <div class="progress-label current-status">
          Delivered
        </div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width:width:${percentProgress}%;"></div>
      </div>
    `
  }

  return progressBarHTML
}


document.addEventListener('DOMContentLoaded', () => {
  renderOrders();

  document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
});
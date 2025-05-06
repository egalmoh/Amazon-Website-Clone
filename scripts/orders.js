import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { updateCartQuantity } from "./amazon.js";
import { cart } from "../data/cart-class.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}


let orderSummaryHTML = '';

async function renderOrders() {
  await loadProductsFetch();

  orders.forEach((orderItem) => {
    
    const orderDate = new Date(orderItem.orderTime);
    const readableDate = orderDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric'});


    orderSummaryHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${readableDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(orderItem.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderItem.id}</div>
          </div>
        </div>

        <div class="order-details-grid js-order-details-grid">
          ${productsInOrder(orderItem)}
        </div>
      </div>
    `
  });

  document.querySelector('.js-orders-grid').innerHTML = orderSummaryHTML;
}


function productsInOrder(orderItem) {

  let productHTML = '';

  orderItem.products.forEach((productItem) => {

    const orderDate = new Date(productItem.estimatedDeliveryTime);
    const readableDate = orderDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric'});

    const matchingProduct = getProduct(productItem.productId)
    if (!matchingProduct) {
      console.error(`Product with ID ${productItem.productId} not found.`);
      return;
    }

    productHTML += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${readableDate}
        </div>
        <div class="product-quantity">
          Quantity: ${productItem.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again"
          data-product-id="${matchingProduct.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${orderItem.id}&productId=${matchingProduct.id}&deliveryTime=${productItem.estimatedDeliveryTime}&quantity=${productItem.quantity}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `
  });
  return productHTML;
};

document.addEventListener('DOMContentLoaded', async () => {
  await renderOrders();

  document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

  document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

  // Use event delegation for "Buy it again" buttons
  document.querySelector('.js-orders-grid').addEventListener('click', (event) => {
    const buyAgainButton = event.target.closest('.js-buy-again');
    if (buyAgainButton) {
      const productId = buyAgainButton.dataset.productId;
      const quantity = parseInt(buyAgainButton.closest('.product-details').querySelector('.product-quantity').textContent.replace('Quantity: ', ''), 10);

      // Add the product to the cart
      console.log(productId)
      cart.addToCart(productId, quantity);

      // Update the cart quantity display
      document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

      console.log(`Added product with ID ${productId} and quantity ${quantity} to the cart.`);
    }
  });

});

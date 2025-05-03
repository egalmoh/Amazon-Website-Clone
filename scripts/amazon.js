// import {cart, addToCart} from '../data/carts.js';
import { cart } from '../data/cart-class.js';
import {products, loadProducts} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {

  document.addEventListener('DOMContentLoaded', () => {
    let productsHTML = '';

    products.forEach((product) => {
      productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines"
            title="${product.name}">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-item-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    });
    document.querySelector('.js-products-grid').innerHTML = productsHTML;

    let timeoutId;

    function addedItem(added) {
      added.classList.add('visible');

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        added.classList.remove('visible');
      }, 2000);
    };

    document.querySelectorAll('.js-add-to-cart')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button.dataset.productId;
          
          let added = document.querySelector(`.js-added-item-${productId}`);
          
          let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`).value;

          addedItem(added);
          cart.addToCart(productId, quantitySelector);
          updateCartQuantity();
        });
    });

    document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
  });
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.cartItems.forEach((item) => {
    cartQuantity += item.quantity;
  });

  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }

  return cartQuantity;
}
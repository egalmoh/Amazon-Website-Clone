import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart-class.js";


async function loadPage() {
  try {

    // throw 'error1';

    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      // throw 'error2';

      loadCart(() => {
        // reject('error3');
        resolve();
      });
    });
  } catch (error) {
    console.log('Unexpected error. Please try again later.')
  }


  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}
loadPage();

/*
new Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then((values) => {
  console.log(values)

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/


/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });
}).then((value) => {      
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/

// loadProducts(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeader();
// });

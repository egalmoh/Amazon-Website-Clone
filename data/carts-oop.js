const cart = {
  cartItems: undefined,

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
    
    if (!this.cartItems) {
      this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  },

  saveToStorage() {
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
  },
  
  addToCart(productId, quantitySelector) {
    let matchingItem;
  
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: Number(quantitySelector) || 1,
        deliveryOptionId: '1'
      });
    }
  
    saveToStorage();
  },

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem)
      }
    })
  
    this.cartItems = newCart;
  
    saveToStorage();
  },

  updateQuantity(productId, newQuantity) {

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    })
  
    saveToStorage()
  },

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    saveToStorage();
  }

}

cart.loadFromStorage();

// cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e', 1);

console.log(cart);
import React, { Component } from 'react';

export const CartContext = React.createContext();

export class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {cartItems: []};
    this.addToCart = this.addToCart.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }
  addToCart(product) {
    console.log('add to cart: ', product);
    const existingProductIndex = this.state.cartItems.findIndex(item => item.id === product.id);
    if (existingProductIndex >= 0) {
      const updatedCartItems = [...this.state.cartItems];
      updatedCartItems[existingProductIndex].quantity++;
      this.setState({
        cartItems: updatedCartItems
      });
    } else {
      this.setState({
        cartItems: [...this.state.cartItems, { ...product, quantity: 1 }]
      });
    }
  }
  updateQuantity(product, newQuantity) {
    if (newQuantity < 1) {
      return;
    }
    const updatedCartItems = this.state.cartItems.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    this.setState({
      cartItems: updatedCartItems
    });
  }
  removeFromCart(productId) {
    const updatedCartItems = this.state.cartItems.filter(
      (item) => item.id !== productId
    );
    this.setState({
      cartItems: updatedCartItems
    });
  }
  render() {
    return (
      <CartContext.Provider
        value={{
          cartItems: this.state.cartItems,
          addToCart: this.addToCart,
          updateQuantity: this.updateQuantity,
          removeFromCart: this.removeFromCart
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

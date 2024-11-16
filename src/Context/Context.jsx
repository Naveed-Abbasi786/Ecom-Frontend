import React, { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    console.log('Updated cart items:', cartItems);
  }, [cartItems]);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    console.log('Removing from cart:', productId);
    setCartItems(cartItems.filter(item => item._id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

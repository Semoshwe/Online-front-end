import { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { createCartItem } from '../services/CartItemService'; // Ensure the path is correct

const CartContext = createContext();

export const CartProvider = ({ children }) => { // children is passed as prop
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const newItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newItem]);

      try {
        await createCartItem(newItem);
      } catch (error) {
        console.error("Failed to save cart item to the database:", error);
      }
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

// Validate that 'children' is required and of node type
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContext;

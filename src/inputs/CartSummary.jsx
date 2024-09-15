// src/inputs/CartSummary.jsx

import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CartContext from '../context/CartContext'; // Ensure the path is correct

function CartSummary() {
  const { cartItems } = useContext(CartContext);

  // Calculate subtotal and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // Example tax rate
  const total = subtotal + tax;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Cart Summary
      </Typography>
      <Typography variant="body1">Subtotal: R{subtotal.toFixed(2)}</Typography>
      <Typography variant="body1">Shipping fee: R{tax.toFixed(2)}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Total: R{total.toFixed(2)}</Typography>
    </Box>
  );
}

export default CartSummary;

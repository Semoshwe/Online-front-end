// src/inputs/OrderReview.jsx

import { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Import Button
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CartContext from '../context/CartContext'; // Ensure the path is correct
import { createOrder } from '../services/OrderService'; // Adjust the import path if needed
import PropTypes from 'prop-types';

function OrderReview({ shippingDetails }) {
  const { cartItems } = useContext(CartContext);
  const [status, setStatus] = useState('');

  // Calculate subtotal and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // Example tax rate
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    if (!shippingDetails) {
      setStatus('Please complete shipping details.');
      return;
    }

    const orderData = {
      items: cartItems,
      shipping: shippingDetails,
      total
    };

    try {
      await createOrder(orderData);
      setStatus('Order placed successfully!');
    } catch (error) {
      setStatus('Error placing order. Please try again.');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Review Your Order
      </Typography>
      <Typography variant="body1" paragraph>
        Please review all items, shipping, and payment details before confirming your order.
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6">Order Details</Typography>
      {cartItems.map((item) => (
        <Typography key={item.id} variant="body1">
          {item.name} (x{item.quantity}) - R{(item.price * item.quantity).toFixed(2)}
        </Typography>
      ))}
      <Typography variant="body1" sx={{ mt: 2 }}>
        Shipping Address: {shippingDetails ? `${shippingDetails.fullName}, ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.postalCode}, ${shippingDetails.country}` : 'Not provided'}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total: R{total.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>
      {status && <Typography variant="body1" sx={{ mt: 2 }}>{status}</Typography>}
    </Box>
  );
}

OrderReview.propTypes = {
  shippingDetails: PropTypes.object, // Validate that shippingDetails is an object
};

export default OrderReview;

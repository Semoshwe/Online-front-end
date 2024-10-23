import { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CartContext from '../context/CartContext';
import { createOrder, findOrdersByCustomerID } from '../services/OrderService'; // Adjust the import path if needed
import PropTypes from 'prop-types';
import { createOrderItem } from '../services/OrderItemService';
//import { useAuth } from '../context/AuthContext';

function OrderReview({ addressId, shippingDetails }) {
  const { cartItems } = useContext(CartContext);
  const [status, setStatus] = useState('');
  //const { currentUser } = "23";//useAuth();

  // Calculate subtotal and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // Example tax rate
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    // Check if addressId and currentUser are valid
    if (!addressId) {
      setStatus('Please complete shipping details.');
      return;
    }

    // if (!currentUser) {
    //   setStatus('No user is currently logged in.');
    //   return;
    // }

    // Create order data without order items
    const orderData = {
      userID: "23",
      addressID: addressId,
      status: 'pending',
      totalPrice: total,
    };

    try {
      // Step 1: Create the order
      await createOrder(orderData);
      setStatus('Order placed successfully!');

      // Step 2: Fetch the order by user ID to get the order ID
      const orders = await findOrdersByCustomerID("23");
      const latestOrder = orders[orders.length - 1]; // Get the most recent order

      // Step 3: Prepare and send order items one by one
      for (const item of cartItems) {
        const orderItem = {
          price: item.price,
          productid: item.productId,
          quantity: item.quantity,
          order_id: latestOrder.id, // Attach the order ID to each item
        };
        
        console.debug('Creating order item with data:', orderItem); // Log the data being sent
        await createOrderItem(orderItem); // Send each order item one by one
      }

      console.log("All order items have been sent successfully."); // Log success

    } catch (error) {
      console.error("Error placing order:", error);
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
        Shipping Address: {shippingDetails ? `${shippingDetails.phoneNumber}, ${shippingDetails.addressLine1}, ${shippingDetails.city}, ${shippingDetails.postalCode}, ${shippingDetails.country}` : 'Not provided'}
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
  addressId: PropTypes.number,
  shippingDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    addressID: PropTypes.number.isRequired,
    fullName: PropTypes.string,
    address: PropTypes.string,
    addressLine1: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    city: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
  }),
};

export default OrderReview;

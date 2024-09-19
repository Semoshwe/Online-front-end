import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Use MUI Grid for layout
import { findOrderItemsByOrderID } from '../services/OrderItemService';
import { readProduct } from '../services/ProductService';
import { updateOrder, readOrder } from '../services/OrderService'; // Import updateOrder
import ProductCard from '../components/ProductCard'; // Import ProductCard component
import SkeletonCard from '../components/SkeletonCard.jsx'; // Import SkeletonCard component
import { useReducer } from 'react';

// Reducer function for managing state
const orderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDER_ITEMS':
      return { ...state, orderItems: action.payload };
    case 'SET_ORDER_TOTAL':
      return { ...state, orderTotal: action.payload };
    case 'SET_FETCH_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default function OrderItems() {
  const { orderID } = useParams(); // Get orderID from URL
  const [state, dispatch] = useReducer(orderReducer, {
    orderItems: [],
    orderTotal: 0,
    error: null,
    loading: true // Set loading to true initially
  });

  React.useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const items = await findOrderItemsByOrderID(orderID); // Fetch order items by orderID
        const itemsWithProducts = await Promise.all(
          items.map(async (item) => {
            const product = await readProduct(item.productID); // Fetch product details by productID
            return { ...item, product };
          })
        );
        const totalPrice = itemsWithProducts.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
        dispatch({ type: 'SET_ORDER_ITEMS', payload: itemsWithProducts }); // Set order items with product details
        dispatch({ type: 'SET_ORDER_TOTAL', payload: totalPrice }); // Set calculated order total

        // Fetch the current order details
        const order = await readOrder(orderID); // Fetch order details to get the current totalPrice
        if (order.totalPrice !== totalPrice) {
          await updateOrder({ ...order, totalPrice }); // Update order total if it doesn't match
        }
        dispatch({ type: 'SET_LOADING', payload: false }); // Set loading to false after fetching data
      } catch (error) {
        dispatch({ type: 'SET_FETCH_ERROR', payload: error });
        dispatch({ type: 'SET_LOADING', payload: false }); // Set loading to false if there's an error
        console.error('Error fetching order items: ', error);
      }
    };

    if (orderID) {
      fetchOrderItems();
    }
  }, [orderID]);

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      {state.loading ? (
        <Grid container spacing={2}>
          {[...Array(5)].map((_, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <SkeletonCard /> {/* Display skeleton cards while loading */}
            </Grid>
          ))}
        </Grid>
      ) : state.orderItems.length > 0 ? (
        <>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
            Order Items for Order ID: {orderID}
          </Typography>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Order Items Total Price: R {state.orderTotal}
          </Typography>
          <Grid container spacing={2}> {/* Grid container to arrange items in rows */}
            {state.orderItems.map((item, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}> {/* Each card occupies part of the row */}
                {/* Pass product, quantity, and productId to ProductCard */}
                <ProductCard 
                  product={item.product} 
                  quantity={item.quantity} 
                  productId={item.productID}
                  totalPrice={state.orderTotal} // Pass total price to ProductCard
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography>No items found for this order.</Typography>
      )}
    </Box>
  );
}

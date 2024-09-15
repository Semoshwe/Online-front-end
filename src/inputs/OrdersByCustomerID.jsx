import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { findOrdersByCustomerID } from '../services/OrderService';
import { findOrderItemsByOrderID } from '../services/OrderItemService'; // Importing order item service

// Define the initial state for the reducer
const initialState = {
  userID: '',
  rows: [],
  orderItems: [],
  error: null,
  loading: false,
};

// Define the reducer function
function ordersReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userID: action.payload };
    case 'FETCH_ORDERS_SUCCESS':
      return { ...state, rows: action.payload, error: null, loading: false };
    case 'FETCH_ORDERS_ERROR':
      return { ...state, rows: [], error: action.payload, loading: false };
    case 'FETCH_ORDER_ITEMS_SUCCESS':
      return { ...state, orderItems: action.payload, error: null, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default function OrdersByCustomerID() {
  const [state, dispatch] = React.useReducer(ordersReducer, initialState);
  const { userID, rows, orderItems, error, loading } = state;

  const handleFetchOrders = async () => {
    dispatch({ type: 'SET_LOADING' }); // Set loading state
    try {
      const data = await findOrdersByCustomerID(userID);
      if (Array.isArray(data) && data.length > 0) {
        dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: data });
      } else {
        dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'No orders found for this customer ID' });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'Error fetching orders: ' + error.message });
    }
  };

  const handleFetchOrderItems = async (orderID) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const items = await findOrderItemsByOrderID(orderID);
      dispatch({ type: 'FETCH_ORDER_ITEMS_SUCCESS', payload: items });
    } catch (error) {
      console.error('Error fetching order items: ', error);
    }
  };

  const handleUserIDChange = (event) => {
    dispatch({ type: 'SET_USER_ID', payload: event.target.value });
  };

  const generate = (element) => {
    return rows.map((row, index) => (
      <ListItem
        key={index}
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'secondary.main' }, // Change color on hover
              cursor: 'pointer', // Change cursor to pointer
            }}
            onClick={() => handleFetchOrderItems(row.id)} // Fetch order items on click
          >
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`Order ID: ${row.id}, Total Price: ${row.totalPrice}`}
          secondary={`Order Date: ${row.orderDate}, Address ID: ${row.addressID}`}
        />
      </ListItem>
    ));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <h2>Orders by User ID</h2>
      <TextField
        label="User ID"
        value={userID}
        onChange={handleUserIDChange}
        margin="normal"
      />
      <Button
        variant="contained"
        sx={{ width: 250, height: 56, margin: 2 }}
        onClick={handleFetchOrders}
        disabled={!userID || loading} // Disable button if userID is empty or loading
      >
        {loading ? 'Loading...' : 'Fetch Orders'}
      </Button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Orders List
        </Typography>
        <List dense>{generate()}</List>
      </Grid>

      {/* Display Order Items when an order is clicked */}
      {orderItems.length > 0 && (
        <Box>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Order Items
          </Typography>
          <List dense>
            {orderItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Item ID: ${item.id}, Name: ${item.productName}, Quantity: ${item.quantity}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

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
import { findOrdersByAddressID } from '../services/OrderService';
import { findOrderItemsByOrderID } from '../services/OrderItemService';

// Initial state for the reducer
const initialState = {
  addressID: '',
  rows: [],
  orderItems: [],
  error: null,
  loading: false,
};

// Reducer function to manage states
function ordersReducer(state, action) {
  switch (action.type) {
    case 'SET_ADDRESS_ID':
      return { ...state, addressID: action.payload };
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

export default function OrdersByAddressID() {
  const [state, dispatch] = React.useReducer(ordersReducer, initialState);
  const { addressID, rows, orderItems, error, loading } = state;

  const handleFetchOrders = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const data = await findOrdersByAddressID(addressID);
      if (Array.isArray(data) && data.length > 0) {
        dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: data });
      } else {
        dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'No orders found for this address ID' });
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

  const handleAddressIDChange = (event) => {
    dispatch({ type: 'SET_ADDRESS_ID', payload: event.target.value });
  };

  const generateOrderList = () => {
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
              '&:hover': { bgcolor: 'secondary.main' },
              cursor: 'pointer',
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
    <Box sx={{ width: '100%', padding: 2 }}>
      <h2>Orders by Address ID</h2>
      <TextField
        label="Address ID"
        value={addressID}
        onChange={handleAddressIDChange}
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchOrders}
        sx={{ width: 250, height: 56, margin: 2 }}
        disabled={!addressID || loading} // Disable if loading or addressID is empty
      >
        {loading ? 'Loading...' : 'Fetch Orders'}
      </Button>
      {error && (
        <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>
      )}

      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Orders List
        </Typography>
        <List dense>{generateOrderList()}</List>
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

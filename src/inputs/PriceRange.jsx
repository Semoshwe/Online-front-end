import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress'; // Import the spinner
import Grid from '@mui/material/Grid'; // Import Grid
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { findOrdersByTotalPriceGreaterThan, deleteOrderByID } from '../services/OrderService';

const MAX = 5000;
const MIN = 100;

const initialState = {
  value: MIN,
  rows: [],
  error: null,
  loading: false,
};

function ordersReducer(state, action) {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, value: action.payload };
    case 'FETCH_ORDERS_SUCCESS':
      return { ...state, rows: action.payload, error: null, loading: false };
    case 'FETCH_ORDERS_ERROR':
      return { ...state, rows: [], error: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default function PriceRange() {
  const [state, dispatch] = React.useReducer(ordersReducer, initialState);
  const { value, rows, error, loading } = state;
  const navigate = useNavigate();
  const debounceTimeout = React.useRef(null); // Reference for debounce timeout

  const handleChange = (_, newValue) => {
    dispatch({ type: 'SET_VALUE', payload: newValue });
    debounceFetchOrders(newValue); // Fetch orders with debouncing
  };

  const debounceFetchOrders = (price) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Clear any previous timeouts
    }
    debounceTimeout.current = setTimeout(() => {
      fetchOrders(price);
    }, 300); // Delay of 300ms
  };

  const fetchOrders = async (price) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await findOrdersByTotalPriceGreaterThan(price);
      console.log('Fetched orders:', response.data); // Log the fetched orders
      if (Array.isArray(response.data) && response.data.length > 0) {
        dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: response.data });
      } else {
        dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'No orders found for this price range' });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'Error fetching orders: ' + error.message });
    }
  };

  const handleOrderSelect = (orderID) => {
    navigate(`/orders/${orderID}/items`);
  };

  const handleDeleteOrders = async (orderID) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const deleted = await deleteOrderByID(orderID);
      if (deleted) {
        const updatedRows = rows.filter(row => row.id !== orderID);
        dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: updatedRows });
        alert(`Order ID ${orderID} has been deleted successfully.`);
      } else {
        alert(`Failed to delete order ID ${orderID}.`);
      }
    } catch (error) {
      console.error('Error deleting order: ', error);
      alert(`Error deleting order ID ${orderID}: ${error.message}`);
    }
  };

  React.useEffect(() => {
    // Fetch initial orders on component mount
    fetchOrders(value);
  }, []);

  return (
    <Box sx={{ width: '90%', padding: 2, margin: 2 }}>
      <h2>Price Greater Than</h2>
      <Slider
        step={10}
        value={value}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          onClick={() => handleChange(null, MIN)}
          sx={{ cursor: 'pointer' }}
        >
          <h2>R {MIN} min</h2>
        </Typography>
        <Typography
          variant="body2"
          onClick={() => handleChange(null, MAX)}
          sx={{ cursor: 'pointer' }}
        >
          <h2>R {MAX} max</h2>
        </Typography>
      </Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <CircularProgress /> {/* Display loading spinner */}
        </Box>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && (
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Orders List
          </Typography>
          <List dense>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      sx={{
                        bgcolor: 'info.main',
                        '&:hover': { bgcolor: 'error.main' },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleDeleteOrders(row.id)}
                    >
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
                      onClick={() => handleOrderSelect(row.id)}
                    >
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Order ID: ${row.id}, Total Price: ${row.totalPrice}`}
                    secondary={`Order Date: ${row.orderDate}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ mt: 4 }} variant="body1" color="textSecondary">
                No orders found for this price range.
              </Typography>
            )}
          </List>
        </Grid>
      )}
    </Box>
  );
}

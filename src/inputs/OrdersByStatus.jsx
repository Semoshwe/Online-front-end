import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
import CircularProgress from '@mui/material/CircularProgress'; // Import the spinner
import { findOrdersByStatus, deleteOrderByID } from '../services/OrderService';

const initialState = {
  status: '',
  rows: [],
  error: null,
  loading: false,
};

function ordersReducer(state, action) {
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, status: action.payload };
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

export default function FindOrdersByStatus() {
  const [state, dispatch] = React.useReducer(ordersReducer, initialState);
  const { status, rows, error, loading } = state;
  const navigate = useNavigate();

  const handleFetchOrders = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const data = await findOrdersByStatus(status);
      if (Array.isArray(data) && data.length > 0) {
        dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: data });
      } else {
        dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'No orders found for this status' });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'Error fetching orders by status: ' + error.message });
    }
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

  const handleStatusChange = (event) => {
    dispatch({ type: 'SET_STATUS', payload: event.target.value });
  };

  const handleOrderSelect = (orderID) => {
    navigate(`/orders/${orderID}/items`);
  };

  const generate = () => {
    return rows.length > 0 ? (
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
            secondary={`Order Date: ${row.orderDate}, Status: ${row.status}`}
          />
        </ListItem>
      ))
    ) : (
      <Typography sx={{ mt: 4 }} variant="body1" color="textSecondary">
        No orders found for this status.
      </Typography>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <h2>Find Orders by Status</h2>
      <TextField
        label="Status"
        value={status}
        onChange={handleStatusChange}
        margin="normal"
        disabled={loading} // Disable input while loading
      />
      <Button
        variant="contained"
        sx={{ width: 250, height: 56, margin: 2 }}
        onClick={handleFetchOrders}
        disabled={!status || loading} // Disable button during loading
      >
        {loading ? 'Loading...' : 'Fetch Orders'}
      </Button>
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
          <List dense>{generate()}</List>
        </Grid>
      )}
    </Box>
  );
}

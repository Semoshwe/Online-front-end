import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import { findOrdersByOrderDateBetween, deleteOrderByID } from '../services/OrderService';

const initialState = {
  startDate: null,
  endDate: null,
  rows: [],
  error: null,
  loading: false,
};

function ordersReducer(state, action) {
  switch (action.type) {
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload };
    case 'FETCH_ORDERS_SUCCESS':
      return { ...state, rows: action.payload, error: null, loading: false };
    case 'FETCH_ORDERS_ERROR':
      return { ...state, rows: [], error: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function FindOrdersByOrderDateBetween() {
  const [state, dispatch] = React.useReducer(ordersReducer, initialState);
  const { startDate, endDate, rows, error, loading } = state;
  const navigate = useNavigate();

  const handleFetchOrders = async () => {
    dispatch({ type: 'SET_LOADING' });
    if (!startDate || !endDate) {
      dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'Please select a valid date range' });
      return;
    }

    if (endDate < startDate) {
      dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'End date cannot be earlier than start date' });
      return;
    }

    try {
      // Format the dates to 'yyyy-MM-dd' format
      const startDateFormatted = startDate.toISOString().split('T')[0];
      const endDateFormatted = endDate.toISOString().split('T')[0];

      const response = await findOrdersByOrderDateBetween(startDateFormatted, endDateFormatted);
      console.log('Fetched orders:', response);

      if (Array.isArray(response) && response.length > 0) {
        dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: response });
      } else {
        dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'No orders found for this date range' });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'Error fetching orders by date range: ' + error.message });
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
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

  return (
    <Box sx={{ width: '90%', padding: 2, margin: 2 }}>
      <h2>Find Orders by Order Date Range</h2>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => dispatch({ type: 'SET_START_DATE', payload: newValue })}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: 250 }} />
          )}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => dispatch({ type: 'SET_END_DATE', payload: newValue })}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: 250 }} />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchOrders}
          sx={{ width: 250, height: 56, margin: 1 }}
          disabled={!startDate || !endDate || loading} // Disable if dates are invalid or loading
        >
          {loading ? 'Loading...' : 'Fetch Orders'}
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{ width: 250, height: 56, margin: 1 }}
        >
          Reset
        </Button>
      </Box>
      {error && (
        <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>
      )}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <CircularProgress /> {/* Display loading spinner */}
        </Box>
      )}
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
                No orders found for this date range.
              </Typography>
            )}
          </List>
        </Grid>
      )}
      <Divider sx={{ margin: 2 }} />
    </Box>
  );
}

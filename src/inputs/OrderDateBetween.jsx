import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; // Import TextField
import { findOrdersByOrderDateBetween } from '../services/OrderService';
import OrdersDisplayTable from '../components/OrdersDisplayTable';
import { DatePicker } from '@mui/x-date-pickers';
import { Divider } from '@mui/material';

export default function FindOrdersByOrderDateBetween() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState(null);

  const handleFetchOrders = async () => {
    try {
      if (startDate && endDate) {
           // Format the dates to 'yyyy-MM-dd' format
      const startDateFormatted = startDate.toISOString().split('T')[0]; // Extract date part
      const endDateFormatted = endDate.toISOString().split('T')[0]; // Extract date part

      const response = await findOrdersByOrderDateBetween(startDateFormatted, endDateFormatted);
      console.log('Fetched orders:', response);
        if (Array.isArray(response) && response.length > 0) {
          setRows(response);
        } else {
          setError('No orders found for this date range');
          setRows([]);
        }
      } else {
        setError('Please select a valid date range');
      }
    } catch (error) {
      setError('Error fetching orders by date range: ' + error.message);
      setRows([]);
    }
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <h2>Find Orders by Order Date Range</h2>
      <div>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: 250 }} />
          )}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: 250 ,margin: 3}} />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchOrders}
          sx={{ width: 250, height: 56 }}
        >
          Fetch Orders
        </Button>  
      </div>
      {error && (
        <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>
      )}
      <Divider /> 
      <OrdersDisplayTable rows={rows} />
    </Box>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { findOrdersByStatus } from '../services/OrderService';
import OrdersDisplayTable from '../components/OrdersDisplayTable';

export default function FindOrdersByStatus() {
  const [status, setStatus] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState(null);

  const handleFetchOrders = async () => {
    try {
      const data = await findOrdersByStatus(status); // Simplified response handling
      console.log('Fetched orders:', data);
      if (Array.isArray(data) && data.length > 0) {
        setRows(data);
        setError(null); // Clear previous errors
      } else {
        setError('No orders found for this status');
        setRows([]); // Clear the table if no orders are found
      }
    } catch (error) {
      setError('Error fetching orders by status: ' + error.message);
      setRows([]); // Clear rows on error
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <h2>Find Orders by Status</h2>
      <TextField
        label="Status"
        value={status}
        onChange={handleStatusChange}
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchOrders}
        sx={{ width: 250, height: 56, margin: 2 }}
        disabled={!status} // Disable button when status is empty
      >
        Fetch Orders
      </Button>
      {error && (
        <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>
      )}
      <OrdersDisplayTable rows={rows} /> {/* Pass rows to the table */}
    </Box>
  );
}

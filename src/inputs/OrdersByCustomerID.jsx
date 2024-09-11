import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { findOrdersByCustomerID } from '../services/OrderService'; // Correct import
import OrdersDisplayTable from '../components/OrdersDisplayTable'; // Importing the OrdersDisplayTable component

export default function OrdersByCustomerID() {
  const [userID, setUserID] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState(null);

  // Function to call the Axios method
  const handleFetchOrders = async () => {
    try {
      const response = await findOrdersByCustomerID(userID);
      console.log('Fetched orders:', response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setRows(response.data); // Set the retrieved data to the rows state
      } else {
        setError('No orders found for this customer ID');
        setRows([]); // Clear the table if no valid data is returned
      }
    } catch (error) {
      setError('Error fetching orders: ' + error.message);
      setRows([]); // Clear the table if there's an error
    }
  };

  const handleUserIDChange = (event) => {
    setUserID(event.target.value);
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
      >
        Fetch Orders
      </Button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <OrdersDisplayTable rows={rows} /> {/* Pass the fetched rows to the table */}
    </Box>
  );
}

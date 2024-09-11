import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { findOrdersByAddressID } from '../services/OrderService';
import OrdersDisplayTable from '../components/OrdersDisplayTable';

export default function OrdersByAddressID() {
  const [addressID, setAddressID] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState(null);

  const handleFetchOrders = async () => {
    try {
      const response = await findOrdersByAddressID(addressID);
      console.log('Fetched orders:', response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setRows(response.data);
      } else {
        setError('No orders found for this address ID');
        setRows([]);
      }
    } catch (error) {
      setError('Error fetching orders: ' + error.message);
      setRows([]);
    }
  };

  const handleAddressIDChange = (event) => {
    setAddressID(event.target.value);
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
      >
        Fetch Orders
      </Button>
      {error && (
        <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>
      )}
      <OrdersDisplayTable rows={rows} />
    </Box>
  );
}
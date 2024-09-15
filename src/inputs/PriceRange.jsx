import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { findOrdersByTotalPriceGreaterThan } from '../services/OrderService';
import OrdersDisplayTable from '../components/OrdersDisplayTable';

const MAX = 5000;
const MIN = 100;

export default function PriceRange() {
  const [val, setVal] = React.useState(MIN);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const debounceTimeout = React.useRef(null); // Reference for debounce timeout

  const handleChange = (_, newValue) => {
    setVal(newValue);
    debounceFetchOrders(newValue); // Fetch orders with debouncing
  };

  // Debounced function to fetch orders
  const debounceFetchOrders = (price) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Clear any previous timeouts
    }
    debounceTimeout.current = setTimeout(() => {
      fetchOrders(price);
    }, 300); // Delay of 300ms
  };

  const fetchOrders = async (price) => {
    setLoading(true);
    setError(null);
    try {
      const response = await findOrdersByTotalPriceGreaterThan(price);
      console.log('Fetched orders:', response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setRows(response.data); // Set the retrieved data to the rows state
      } else {
        setError('No orders found for this price range');
        setRows([]); // Clear the table if no valid data is returned
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error fetching orders: ' + error.message);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // Fetch initial orders on component mount
    fetchOrders(val);
  }, []);

  return (
    <Box sx={{ width: '90%', padding: 2, margin: 2 }}>
      <h2>Price Greater Than </h2>
      <Slider
        step={10}
        value={val}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          onClick={() => setVal(MIN)}
          sx={{ cursor: 'pointer' }}
        >
          <h2>R {MIN} min</h2>
        </Typography>
        <Typography
          variant="body2"
          onClick={() => setVal(MAX)}
          sx={{ cursor: 'pointer' }}
        >
          <h2>R {MAX} max</h2>
        </Typography>
      </Box>
      {loading && <div>Loading orders...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <OrdersDisplayTable rows={rows} /> {/* Pass the rows to the OrdersDisplayTable component */}
    </Box>
  );
}

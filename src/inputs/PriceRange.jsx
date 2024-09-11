// PriceRange.jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { findOrdersByTotalPriceGreaterThan } from '../services/OrderService'; // Correct import
import OrdersDisplayTable from '../components/OrdersDisplayTable'; // Importing the PriceRangeTable component

const MAX = 10000;
const MIN = 100;

export default function PriceRange() {
  const [val, setVal] = React.useState(MIN);
  const [rows, setRows] = React.useState([]);

  const handleChange = (_, newValue) => {
    setVal(newValue);
    fetchOrders(newValue); // Fetch orders when slider value changes
  };

  // Function to call the Axios method
  const fetchOrders = async (price) => {
    try {
        const response = await findOrdersByTotalPriceGreaterThan(price);
        console.log('Fetched orders:', response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
            setRows(response.data); // Set the retrieved data to the rows state
        } else {
            console.warn('No orders found or invalid response:', response);
            setRows([]); // Clear the table if no valid data is returned
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        setRows([]); // Clear the table if there's an error
    }
};



  return (
    <Box  sx={{ width: '90%', padding: 2,  margin: 2  }}>
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
      <OrdersDisplayTable rows={rows} /> {/* Pass the rows to the DataTable component */}
    </Box>
  );
}

// src/inputs/ShippingDetails.jsx

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; // Import Button
import PropTypes from 'prop-types';

function ShippingDetails({ onSave }) {
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onSave(shippingDetails); // Pass shipping details to parent
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Shipping Details
      </Typography>
      <TextField
        label="Full Name"
        name="fullName"
        fullWidth
        margin="normal"
        value={shippingDetails.fullName}
        onChange={handleChange}
      />
      <TextField
        label="Address"
        name="address"
        fullWidth
        margin="normal"
        value={shippingDetails.address}
        onChange={handleChange}
      />
      <TextField
        label="City"
        name="city"
        fullWidth
        margin="normal"
        value={shippingDetails.city}
        onChange={handleChange}
      />
      <TextField
        label="Postal Code"
        name="postalCode"
        fullWidth
        margin="normal"
        value={shippingDetails.postalCode}
        onChange={handleChange}
      />
      <TextField
        label="Country"
        name="country"
        fullWidth
        margin="normal"
        value={shippingDetails.country}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
        Save Shipping Details
      </Button>
    </Box>
  );
}

ShippingDetails.propTypes = {
  onSave: PropTypes.func.isRequired, // Validate that onSave is a required function
};

export default ShippingDetails;

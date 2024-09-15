import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; // Import Button
import OrderReview from './OrderReview'; // Import OrderReview component
import PropTypes from 'prop-types';

function ShippingDetails() {
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [isSaved, setIsSaved] = useState(false); // Track if the details are saved
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      // Simulate saving process
      setIsSaved(true); // Set the button to "Saved" state
    } catch (error) {
      console.error("Error saving shipping details:", error);
      setErrorMessage("Error saving details. Please try again."); // Display an error message
    }
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
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSave}
        disabled={isSaved} // Disable the button if details are saved
      >
        {isSaved ? "Saved" : "Save Shipping Details"} {/* Change text if saved */}
      </Button>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      {/* Render OrderReview only after shipping details are saved */}
      {isSaved && <OrderReview shippingDetails={shippingDetails} />}
    </Box>
  );
}

ShippingDetails.propTypes = {
  onSave: PropTypes.func, // Optional in this case
};

export default ShippingDetails;

// src/components/ShippingDetails.jsx
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; // Import Button
import OrderReview from './OrderReview'; // Import OrderReview component
import PropTypes from 'prop-types';
import { createAddress, getAddressByAddressLine1 } from '../services/AddressService'; // Import address service to save the address

function ShippingDetails() {
  const [shippingDetails, setShippingDetails] = useState({
    title: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    postalCode: '',
    phoneNumber: '' // Add phone number field
  });

  const [isSaved, setIsSaved] = useState(false); // Track if the details are saved
  const [errorMessage, setErrorMessage] = useState('');
  const [addressId, setAddressId] = useState(null); // Store the addressId after saving

  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
        // Save the address and await the response
        console.log("Saving address with details:", shippingDetails); 
        await createAddress(shippingDetails);
        console.log("Address saved successfully!");

        // Fetch the address using the addressLine1 after saving
        console.log("Fetching address by AddressLine1:", shippingDetails.addressLine1);
        const response = await getAddressByAddressLine1(shippingDetails.addressLine1); 
        console.log("Response received from getAddressByAddressLine1:", response);

        // Validate the response structure
        if (response && Array.isArray(response)) {
            // If response is an array and has addresses
            if (response.length > 0) {
                const firstAddress = response[0]; // Get the first address
                console.log("First address found:", firstAddress);

                if (firstAddress.id) {
                    setAddressId(firstAddress.id); // Set addressId
                    setIsSaved(true); // Mark as saved
                    console.log("Address ID set:", firstAddress.id);
                } else {
                    throw new Error("Invalid address structure or addressId not found");
                }
            } else {
                console.warn("No addresses found for this addressLine1:", shippingDetails.addressLine1);
                throw new Error("No addresses found for this addressLine1");
            }
        } else {
            throw new Error("Invalid response structure or response is not an array.");
        }
    } catch (error) {
        console.error("Error saving shipping details:", error);
        setErrorMessage("Error saving details. Please try again.");
    }
};

  
  

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Shipping Details
      </Typography>
      <TextField
        label="Home/Office"
        name="title"
        fullWidth
        margin="normal"
        value={shippingDetails.title}
        onChange={handleChange}
      />
      <TextField
        label="Address Line 1"
        name="addressLine1"
        fullWidth
        margin="normal"
        value={shippingDetails.addressLine1}
        onChange={handleChange}
      />
      <TextField
        label="Address Line 2"
        name="addressLine2"
        fullWidth
        margin="normal"
        value={shippingDetails.addressLine2}
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
        label="Country"
        name="country"
        fullWidth
        margin="normal"
        value={shippingDetails.country}
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
        label="Phone Number"
        name="phoneNumber"
        fullWidth
        margin="normal"
        value={shippingDetails.phoneNumber}
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
      {isSaved && <OrderReview addressId={addressId} shippingDetails={shippingDetails} />}
    </Box>
  );
}

ShippingDetails.propTypes = {
  onSave: PropTypes.func, // Optional in this case
};

export default ShippingDetails;

// src/inputs/PaymentOptions.jsx

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function PaymentOptions() {
  const [selectedPayment, setSelectedPayment] = useState(''); // State to store selected payment method

  // Handler for payment method selection
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value); // Update the selected payment method
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Payment Options
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup aria-label="payment" name="payment" value={selectedPayment} onChange={handlePaymentChange}>
          <FormControlLabel value="credit-card" control={<Radio />} label="Credit Card" />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          <FormControlLabel value="bank-transfer" control={<Radio />} label="Bank Transfer" />
        </RadioGroup>
      </FormControl>

      {/* Conditionally render forms based on selected payment method */}
      {selectedPayment === 'credit-card' && (
        <Box mt={2}>
          <Typography variant="h6">Credit Card Details</Typography>
          <TextField label="Card Number" variant="outlined" fullWidth margin="normal" />
          <TextField label="Expiry Date" variant="outlined" fullWidth margin="normal" />
          <TextField label="CVV" variant="outlined" fullWidth margin="normal" />
        </Box>
      )}

      {selectedPayment === 'paypal' && (
        <Box mt={2}>
          <Typography variant="h6">PayPal Account Details</Typography>
          <TextField
            label="PayPal Email"
            value="generemukoko@gmail.com"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      )}

      {selectedPayment === 'bank-transfer' && (
        <Box mt={2}>
          <Typography variant="h6">Bank Account Details</Typography>
          <TextField
            label="Bank Name"
            value="Absa"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Account Number"
            value="625489276163"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      )}
    </div>
  );
}

export default PaymentOptions;

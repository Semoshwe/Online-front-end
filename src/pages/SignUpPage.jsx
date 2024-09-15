import React, { useState } from 'react';
import { Avatar, Grid, Paper, Typography, TextField, Button } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom'; // For navigation after signup
import { createUser } from '../services/userService'; // Import createUser method

const SignUp = () => {
  const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: 'blue' };
  const marginTop = { marginTop: 5 };
  
  const navigate = useNavigate(); // To navigate to another page after success

  // State to handle form data
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'Customer'
  });

  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Reset error before submission
    setError(null);

    try {
      console.log('Sending data:', formData); // Log form data
      await createUser(formData);
      // Redirect to another page on success (e.g., login page or profile page)
      navigate('/login');
    } catch (error) {
      setError('Failed to create user. Please try again.');
    }
  };

  return (
    <Grid container justifyContent="center">
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AccountCircleOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="body2">Please fill in to sign up</Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Surname"
            placeholder="Enter your surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <FormControl style={marginTop}>
            <FormLabel>Role</FormLabel>
            <RadioGroup
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{ display: 'initial' }}
            >
              <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
              <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={marginTop}
          >
            Sign Up
          </Button>
          {error && <Typography color="error" style={{ marginTop: 10 }}>{error}</Typography>}
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUp;

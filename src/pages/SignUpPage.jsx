import { useState } from 'react';
import { Avatar, Grid, Paper, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthenticationService';

const SignUp = () => {
  const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: 'blue' };
  const marginTop = { marginTop: 5 };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    firstName: '', 
    lastName: '', 

    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    avatar: 'default-avatar.png',
    birthDate: '', 
    role: 'USER'  // Default role is USER
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError(null);
    
    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      navigate('/login');

    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
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
            label="avatar"
            placeholder="Enter your avatar"
            name="avatar"  
            value={formData.avatar}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            fullWidth
            label="First Name"
            placeholder="Enter your first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Last Name"
            placeholder="Enter your last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            sx={{ mb: 2 }}
          />

          {/* Dropdown for Role Selection */}
          <FormControl fullWidth style={marginTop}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
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

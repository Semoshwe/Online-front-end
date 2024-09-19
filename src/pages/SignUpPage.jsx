import { useState } from 'react';
import { Avatar, Grid, Paper, Typography, TextField, Button } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userService';

const SignUp = () => {
  const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: 'blue' };
  const marginTop = { marginTop: 5 };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '', // Adjusted to match server-side expectations
    lastName: '', // Adjusted to match server-side expectations
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    avatar: 'default-avatar.png',
    birthDate: '', // Date should be in yyyy-MM-dd format
    roles: ['USER'] // Adjusted to match server-side expectations
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
      console.log('Sending data:', formData); // Log form data
      await createUser(formData);
      navigate('/login');
    } catch (error) {
      console.error('Error creating user:', error);
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
            label="First Name"
            placeholder="Enter your first name"
            name="firstName" // Adjusted to match server-side expectations
            value={formData.firstName} // Adjusted to match server-side expectations
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            placeholder="Enter your last name"
            name="lastName" // Adjusted to match server-side expectations
            value={formData.lastName} // Adjusted to match server-side expectations
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
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <FormControl style={marginTop}>
            <FormLabel>Role</FormLabel>
            <RadioGroup
              name="roles"
              value={formData.roles[0]} // Assuming single role is selected
              onChange={(e) => setFormData({ ...formData, roles: [e.target.value] })}
              style={{ display: 'initial' }}
            >
              <FormControlLabel value="USER" control={<Radio />} label="User" />
              <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
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

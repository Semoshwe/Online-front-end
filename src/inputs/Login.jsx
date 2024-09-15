import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createUser } from '../services/userService'; // Adjust the path if needed
import { useState } from 'react';
import { useHistory } from 'react-router-dom'; // For redirecting after login

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const history = useHistory(); // Hook for programmatic navigation

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(loginData); // Use your login endpoint
      console.log('Login successful:', response);
      // Redirect or update state on successful login
      history.push('/'); // Example redirect
    } catch (error) {
      console.error('Login error:', error);
      setError('Error logging in: ' + error.message);
    }
  };

  return (
    <Box sx={{ width: '100vh', padding: 2 }}>
      <h2>Login</h2>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          name="username"
          label="Username"
          value={loginData.username}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          value={loginData.password}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: 250, height: 56, margin: 2 }}
        >
          Sign In
        </Button>
        {error && (
          <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>
        )}
      </Box>
    </Box>
  );
}

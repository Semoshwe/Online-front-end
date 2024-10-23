import { useState } from 'react';
import { Box, Avatar, Container, FormControlLabel, Link, TextField, 
         Typography, Paper, Button, Grid, Checkbox, CircularProgress, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            await login(loginData.email, loginData.password);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar sx={{
                    mx: 'auto',
                    bgcolor: 'secondary.main',
                    textAlign: "center",
                    mb: 1
                }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant="h5" sx={{ textAlign: "center" }}>
                    Sign In
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mt: 2, mb: 2 }} onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        placeholder="Enter email"
                        fullWidth
                        required
                        autoFocus
                        name="email"
                        value={loginData.email}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                        error={Boolean(error)}
                        disabled={loading}
                    />
                    <TextField
                        placeholder="Enter Password"
                        fullWidth
                        required
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                        error={Boolean(error)}
                        disabled={loading}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        sx={{ mt: 1 }} 
                        disabled={loading || !loginData.email || !loginData.password}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
                    </Button>
                    <Grid container justifyContent='space-between' sx={{ mt: 1 }}>
                        <Grid item>
                            <Link component={RouterLink} to="/forgot">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to="/signup">
                                Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
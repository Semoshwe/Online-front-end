import { CheckBox } from "@mui/icons-material";
import { useState } from 'react';
import { Box } from '@mui/system';
import { Avatar, Container, FormControlLabel, Link, TextField, Typography, Paper, Button, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {Link as RouterLink} from "react-router-dom";

import {findUserByUsername} from '../services/userService';

const LoginPage = () => {
    console.log("LoginPage loaded");
    const [loginData, setLoginData] = useState({ // This requires the useState hook to be imported
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);
    };

    return(
        <Container maxWidth = "xs">
            <Paper elevation = {10}  sx={{marginTop:8, padding:2 }}>
                <Avatar sx = {{
                    mx:'auto', 
                    bgcolor: 'secondary main', 
                    textAlign:"center" , 
                    mb:1
                    }}
                    >
                    <LockOutlinedIcon/>
                    
                </Avatar>
                <Typography component = 'h1' variant = "h5" sx = {{ textAlign: "center"}}>
                    Sign In
                </Typography>
                <Box 
                component ='form' 
                onSubmit = {handleSubmit}  
                noValidate
                sx = {{mt:1}}
                >
                    <TextField 
                    placeholder="Entre username" 
                    fullWidth 
                    required 
                    autoFocus 
                    sx ={{mb:2}}
                    />
                    <TextField 
                    placeholder="Entre Password" 
                    fullWidth 
                    required 
                    autoFocus 
                    sx ={{mb:2}}
                    />
                    <FormControlLabel control = {<CheckBox value ="remember" color ="primary"/>}
                    label = "Remember me"
                />
                    <Button type = "submit" variant ="contained" fullWidth sx = {{mt:1}}>
                        Sign in
                    </Button>
                    <Grid container justifyContent = 'space-between' sx ={{mt:1}}>
                        <Grid item>
                            <Link component = {RouterLink} to ="/forgot">
                            Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component = {RouterLink} to ="/signup">
                            Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

        </Container>
    );
}

export default LoginPage;
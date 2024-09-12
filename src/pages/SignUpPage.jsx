import React from 'react'
import { Avatar, Grid,Paper, Typography,TextField, Button } from "@mui/material"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const SignUp = () => {
const paperStyle = {padding:'30px 20px' , width: 300, margin:"20px auto"}
const headerStyle = {margin:0}
const avatarStyle = { backgroundColor :'blue'}
const marginTop = {marginTop:5}
    return(

       <Grid> 
       <Paper elevation={20} style={paperStyle}>
        <Grid align='center' >
            <Avatar style={avatarStyle}>
            <AccountCircleOutlinedIcon/>
            </Avatar>
            <h2 style ={headerStyle }> Sign up</h2>
            <Typography variant ="caption"> Please fill in to Sign up</Typography>
        </Grid>
       <form>
            <TextField fullWidth label = 'Name' placeholder='enter your Name'/>
            <TextField fullWidth label = 'Surname' placeholder='enter your Surname'/>
            <TextField fullWidth label = 'email' placeholder='enter your Email'/>
            <TextField fullWidth label = 'PhoneNumber' placeholder='enter you phoneNumber'/>
            <TextField fullWidth label = 'Password'/>
            <TextField fullWidth label = 'Confirm Password'/>
            <FormControl style ={marginTop}>
                <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                     <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                        name="radio-buttons-group"
                        style={{display:'initial'}}
                    >
                    <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                    <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                    </RadioGroup>
            </FormControl>
            <Button type = 'submit' variant = 'contained' color='primary' component = {RouterLink} to ="/signup">Sign Up</Button>
            
       </form>
       </Paper>
       
       </Grid>
    )


}
export default SignUp;
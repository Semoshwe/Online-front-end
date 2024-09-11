// import * as React from 'react';

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
// import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";

export default function ProductImageRead(){

    return (
        <Box>
            <TextField
                label="Image ID"
                margin="normal"
            >

            </TextField>
            <Button
            variant="contained"
            sx={{ width: 250, height: 56, margin: 2}}
            // onClick={}
            >
                Read ID
            </Button>
            <Card sx={{ maxWidth: 345, margin: 2}}>
                <CardMedia
                    component="img"
                    alt="product image"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                />
                <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                        Image ID here
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                        Product ID here
                    </Typography>
                    {/*<Typography gutterBottom variant="body2" component="div">*/}
                    {/*    Image ID here*/}
                    {/*</Typography>*/}
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
        </Box>

    );
}
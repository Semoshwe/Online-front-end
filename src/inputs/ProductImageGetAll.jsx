// import {getAllProducts} from "../services/ProductService.js";
// import Button from "@mui/material/Button";
// import axios from 'axios';
// import {useEffect, useState} from 'react';
// import Card from '@mui/material/Card';
// import {TextFields} from "@mui/icons-material";
// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function ProductImageGetAll() {
    // const [ setError] = React.useState(null);
    //
    //
    // const handleGetAllProducts = async () => {
    //     try {
    //         const response = await getAllProducts();
    //         console.log('Get all products:', response.data);
    //     } catch (error) {
    //         setError('Error getting products:' + error.message);
    //     }
    // }
    //
    // return (
    //     <Button sx={{width: 150, height: 100, margin: 1}} onClick={handleGetAllProducts}>
    //         Get all Products
    //     </Button>
    // );

    // const fetchPost = () => {
    //
    //     fetch('http://localhost:8080/shopping_store/product/getAll')
    //         .then((response) => response.json())
    //         .then((data)=>productID(data))
    // }
    // const Axios = () => {
    //     const [product, setProduct] = useState([])
    //     useEffect(() => {
    //         axios.get('http://localhost:8080/shopping_store/product/getAll')
    //             .then((res) => {
    //                 setProduct(res.data.product)
    //             })
    //     })
    // }

    return (
        <Grid container spacing={4} sx={{ mt: 4 }}>
            <Card sx={{ maxWidth: 345 }}>
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
        </Grid>

    );
}
// import {getAllProducts} from "../services/ProductService.js";
// import Button from "@mui/material/Button";
// import axios from 'axios';
// import {useEffect, useState} from 'react';
// import Card from '@mui/material/Card';
// import {TextFields} from "@mui/icons-material";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {getAllProducts} from "../services/ProductService.js";

export default function ProductGetAll() {
    const[product, setProduct] = React.useState(null);
    const [error, setError] = React.useState(null);


    const handleGetAllProducts = async () => {
        try {
            const response = await getAllProducts();
            setProduct(response);
            console.log('Get all products:', response.data);
        } catch (error) {
            setError('Error getting products:' + error.message);
            setProduct(null); // Clears product if error occurs
        }
    }

    return (
        <div>
            <Button
                variant="contained"
                sx={{ width: 250, height: 56, margin: 2}}
                onClick={handleGetAllProducts()}
            >
                Get all
            </Button>
            {error && (
                <Typography color="error" variant="body2" sx={{ margin: 2 }}>
                    {error}
                </Typography>
            )}
            {product && (
                <Grid container spacing={3} sx={{ mt: 4 }}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt={product.name}
                            height="140"
                            image={product.imagePath || "/static/images/cards/contemplative-reptile.jpg"}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                                Product ID: {product.id}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Name: {product.name}
                            </Typography>
                            <Typography variant="body2" component="div">
                                Description: {product.description}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Price: ${product.price}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Stock: {product.stock}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Category ID: {product.categoryId}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Created date: {product.createdAt}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Updated date: {product.updatedAt}
                            </Typography>
                        </CardContent>
                        <CardActions>
                             {/*Add actions like Edit, Delete, etc. */}
                        </CardActions>
                    </Card>
                </Grid>
            )}
        </div>
    );
}
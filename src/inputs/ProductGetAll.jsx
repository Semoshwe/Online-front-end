import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {getAllProducts} from "../services/ProductService.js";
import {useEffect, useState} from "react";
import {CircularProgress, Container} from "@mui/material";

export default function ProductGetAll() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products from the API
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data); // Set fetched products
                setLoading(false); // Set loading to false after fetching
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false); // Stop loading in case of an error
            }
        };

        fetchProducts();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="h6" component="p" sx={{ mt: 2 }}>
                    Loading products...
                </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6" component="p" color="error">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="500"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="h5" >
                                    Product id: {product.productId}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Name: {product.name}
                                </Typography>
                                <Typography variant="h5" >
                                    Description: {product.description}
                                </Typography>
                                <Typography variant="h5" >
                                    Price: R{product.price}
                                </Typography>
                                <Typography variant="h5" >
                                    Stock: {product.stock}
                                </Typography>
                                <Typography variant="h5" >
                                    Category id: {product.categoryId}
                                </Typography>
                                <Typography variant="h5" >
                                    Date created: {product.createdAt}
                                </Typography>
                                <Typography variant="h5" >
                                    Date updated: {product.updatedAt}
                                </Typography>
                                <Typography variant="h5" >
                                    Date updated: {product.imageUrl}
                                </Typography>
                            </CardContent>

                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
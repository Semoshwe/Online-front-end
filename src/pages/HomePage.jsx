import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, CardActions, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../services/ProductService'; // Import the getAllProducts service

function HomePage() {
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
            <Box textAlign="center" mb={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Capstone Store
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Discover the latest trends in fashion and get inspired by our new styles.
                </Typography>
                <Button component={Link} to="/product-listing" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                    Shop Now
                </Button>
            </Box>

            {/* Featured Products Section */}
            <Box textAlign="center" mb={4}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Featured Products
                </Typography>
                <Grid container spacing={4}>
                    {products.slice(0, 6).map(product => ( // Use slice to limit the number of products
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image={product.image}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="h6">
                                        Price: R{product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {/* Link to product details page with product ID */}
                                    <Button component={Link} to={`/product-detail/${product.id}`} variant="contained" color="primary">
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Promotions Section */}
            {/*<Box textAlign="center" mb={4}>*/}
            {/*    <Typography variant="h4" component="h2" gutterBottom>*/}
            {/*        Promotions*/}
            {/*    </Typography>*/}
            {/*    <Grid container spacing={4}>*/}
            {/*        /!* Promotion cards here *!/*/}
            {/*    </Grid>*/}
            {/*</Box>*/}
        </Container>
    );
}

export default HomePage;

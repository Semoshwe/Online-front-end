// import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// Update
function HomePage() {
  // Example products data with IDs
  const products = [
    {
      id: 1,
      name: "Resort shirt - white & green",
      price: "R195",
      image: "https://assets.superbalistcdn.co.za/500x720/filters:quality(75):format(jpg)/3708089/original.jpg"
    },
    {
      id: 2,
      name: "Jsammy - black",
      price: "R879",
      image: "https://assets.superbalistcdn.co.za/500x720/filters:quality(75):format(jpg)/3638414/original.jpg"
    },
    {
      id: 3,
      name: "Haven Maxi Dress - Stripe Blue",
      price: "R699",
      image: "https://assets.superbalistcdn.co.za/500x720/filters:quality(75):format(jpg)/3714425/original.jpg"
    }
  ];

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
          {products.map(product => (
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
                  <Typography variant="body2" color="text.secondary">
                    {product.price}
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
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Promotions
        </Typography>
        <Grid container spacing={4}>
          {/* Promotion cards here */}
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;

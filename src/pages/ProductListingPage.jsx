//import React from 'react';


import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';

const products = [

  
  {
    id: 1,
    name: 'Resort shirt - white & green',
    description: 'R195',
    image: 'https://assets.superbalistcdn.co.za/500x720/filters:quality(75):format(jpg)/3708089/original.jpg',
  },
  {
    id: 2,
    name: 'Jsammy - black',
    description: 'R879',
    image: 'https://assets.superbalistcdn.co.za/500x720/filters:quality(75):format(jpg)/3638414/original.jpg',
  },
  {
    id: 3,
    name: 'Haven Maxi Dress - Stripe Blue',
    description: 'R699',
    image: 'https://assets.superbalistcdn.co.za/500x720/filters:quality(75):format(jpg)/3714425/original.jpg',
  },
  // Add more products as needed
];

function ProductListingPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Product Listing
      </Typography>
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
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
              <Button component={Link} to={`/product-detail/${product.id}`} variant="contained" color="primary">
                View Details
              </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

}

export default ProductListingPage;
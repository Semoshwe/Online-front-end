import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, CircularProgress } from '@mui/material';
import { getAllProducts } from '../services/ProductService'; // Import your product service

function ProductListingPage() {
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

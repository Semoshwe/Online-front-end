import { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardMedia, Button, Rating, FormControl, InputLabel, Select, MenuItem, Paper, CircularProgress } from '@mui/material';
import CartContext from '../context/CartContext';
import { readProduct } from '../services/ProductService';

function ProductDetailPage() {
  const { productId } = useParams(); // Get productId from the URL
  const { addToCart } = useContext(CartContext); // Access CartContext
  const [product, setProduct] = useState(null); // State to store the product details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [minRating, setMinRating] = useState(0); // For filtering reviews by rating
  const [reviews, setReviews] = useState([ // Sample reviews
    {
      id: 1,
      user: 'Mthandeni',
      comment: 'Great! Highly recommend.',
      rating: 5,
    },
    {
      id: 2,
      user: 'Rethabile',
      comment: 'Good value for money.',
      rating: 4,
    }
  ]);

  // Fetch product details based on productId when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await readProduct(productId); // Fetch the product by its ID
        setProduct(data); // Set the product details
      } catch (err) {
        console.error("Error fetching product:", err);
        setError('Failed to fetch product');
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of success or error
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      setError('Product ID is undefined');
      setLoading(false);
    }
  }, [productId]);

  // Display a loading spinner while the product details are being fetched
  if (loading) {
    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6" component="p" sx={{ mt: 2 }}>
            Loading product details...
          </Typography>
        </Container>
    );
  }

  // Display an error message if there was a problem fetching the product
  if (error || !product) {
    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h4">{error || 'Product not found'}</Typography>
        </Container>
    );
  }

  // Function to handle the addition of the product to the cart
  const handleAddToCart = () => {
    const selectedProduct = {
      id: product.productId, // Use productId from the fetched product
      name: product.name,
      price: product.price,
      image: product.images.imageUrl1, // Use first image for the cart
    };
    addToCart(selectedProduct);
    alert(`${product.name} has been added to your cart!`);
  };

  // Render the ProductDetailPage component with the fetched product details
  return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                  component="img"
                  height="400"
                  image={product.images.imageUrl1} // Display first image
                  alt={product.name}
              />
            </Card>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              {/* Display additional images */}
              {[product.images.imageUrl2, product.images.imageUrl3, product.images.imageUrl4].map((image, index) => (
                  <Card key={index} sx={{ width: '30%' }}>
                    <CardMedia
                        component="img"
                        height="100"
                        image={image}
                        alt={`${product.name} ${index + 1}`}
                    />
                  </Card>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                Price: R{product.price}
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                Stock: {product.stock}
              </Typography>
              <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                  component={Link}
                  to="/wishlist"
                  variant="outlined"
                  color="secondary"
                  size="large"
                  sx={{ mt: 2, ml: 2 }}
              >
                Add to Wishlist
              </Button>
              {/* Write Review button, passing productId as state */}
              <Button
                  component={Link}
                  to={`/product-review/${product.productId}`} // Pass only productId
                  variant="outlined"
                  color="secondary"
                  size="large"
                  sx={{ mt: 2, ml: 2 }}
              >
                Write a Review
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Reviews
          </Typography>
          <FormControl variant="outlined" sx={{ mb: 2, minWidth: 120 }}>
            <InputLabel>Min Rating</InputLabel>
            <Select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                label="Min Rating"
            >
              {[0, 1, 2, 3, 4, 5].map((value) => (
                  <MenuItem key={value} value={value}>{value === 0 ? 'All' : `${value} Star${value > 1 ? 's' : ''}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {reviews.filter((review) => review.rating >= minRating).length === 0 ? (
              <Typography variant="body1" color="textSecondary">
                No reviews available for the selected rating.
              </Typography>
          ) : (
              reviews.filter((review) => review.rating >= minRating).map((review) => (
                  <Paper key={review.id} elevation={3} sx={{ p: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
                        {review.user}
                      </Typography>
                      <Rating value={review.rating} readOnly />
                    </Box>
                    <Typography variant="body1">
                      {review.comment}
                    </Typography>
                  </Paper>
              ))
          )}
        </Box>
      </Container>
  );
}

export default ProductDetailPage;

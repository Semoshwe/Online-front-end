import { useState, useContext } from 'react';  // Import useContext to access CartContext
import { useParams } from 'react-router-dom';  // Import useParams to get the productId from the URL
import { Container, Typography, Box, Grid, Card, CardMedia, Button, Rating, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';  // Import CartContext

// Static list of products (in a real app, you would fetch this data)
const products = [
  {
    id: 1,
    name: 'Resort shirt - white & green',
    description: 'South African brand, Shirt, Collar neckline, Button closure, All over print, Curved him, 100% Cotton ',
    images: [
      'https://assets.superbalistcdn.co.za/500x720/filters:quality(75):format(jpg)/3707139/original.jpg',
      'https://assets.superbalistcdn.co.za/142x206/filters:quality(75):format(jpg)/3707140/original.jpg',
      'https://assets.superbalistcdn.co.za/142x206/filters:quality(75):format(jpg)/3708089/original.jpg',
      'https://assets.superbalistcdn.co.za/142x206/filters:quality(75):format(jpg)/3708092/original.jpg',
    ],
    price: 195.00,
  },
  {
    id: 2,
    name: 'Jsammy - black',
    description: 'Stylish black shirt made of premium cotton with a comfortable fit.',
    images: [
      'https://assets.superbalistcdn.co.za/500x720/filters:quality(75):format(jpg)/3638414/original.jpg',
      'https://assets.superbalistcdn.co.za/142x206/filters:quality(75):format(jpg)/3638415/original.jpg',
    ],
    price: 879.00,
  },
  // Add more products as needed
];

const reviews = [
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
  },
  // Add more reviews as needed
];

function ProductDetailPage() {
  const { productId } = useParams();  // Get productId from the URL
  const { addToCart } = useContext(CartContext);  // Access CartContext
  const [minRating, setMinRating] = useState(0);

  // Find the product by ID
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return <Typography variant="h4">Product not found</Typography>;
  }

  const handleMinRatingChange = (event) => {
    setMinRating(event.target.value);
  };

  // Correcting the handleAddToCart function by using 'product' directly
  const handleAddToCart = () => {
    const selectedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],  // Ensuring correct image is added
    };
    addToCart(selectedProduct);
    alert(`${product.name} has been added to your cart!`);
  };

  const filteredReviews = reviews.filter((review) => review.rating === minRating || minRating === 0);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.images[0]}
              alt={product.name}
            />
          </Card>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            {product.images.slice(1).map((image, index) => (
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
            <Typography variant="h5" component="h2" gutterBottom>
              {product.price}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
              onClick={handleAddToCart}  // Calls the function to add the product to cart
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
            <Button
              component={Link}
              to={`/product_review/`}
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
            onChange={handleMinRatingChange}
            label="Min Rating"
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>1 Star</MenuItem>
            <MenuItem value={2}>2 Stars</MenuItem>
            <MenuItem value={3}>3 Stars</MenuItem>
            <MenuItem value={4}>4 Stars</MenuItem>
            <MenuItem value={5}>5 Stars</MenuItem>
          </Select>
        </FormControl>
        {filteredReviews.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No reviews available for the selected rating.
          </Typography>
        ) : (
          filteredReviews.map((review) => (
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

// import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// Update
function HomePage() {
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
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                    component="img"
                    height="500"
                    image="https://assets.superbalistcdn.co.za/500x720/filters:quality(75):format(jpg)/3708089/original.jpg"
                    alt="Resort shirt - white & green"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Resort shirt - white & green
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    R195
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to="/product-listing" size="small" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                    component="img"
                    height="500"
                    image="https://assets.superbalistcdn.co.za/500x720/filters:quality(75):format(jpg)/3638414/original.jpg"
                    alt="Jsammy - black"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Jsammy - black
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    R879
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to="/product-listing" size="small" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                    component="img"
                    height="500"
                    image="https://assets.superbalistcdn.co.za/500x720/filters:quality(75):format(jpg)/3714425/original.jpg"
                    alt="Haven V-neck Maxi Dress - Asher Stripe Blue"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Haven Maxi Dress - Stripe Blue
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    R699
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to="/product-listing" size="small" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Promotions Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Promotions
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image="https://via.placeholder.com/300"
                    alt="Promotion 1"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Promotion 1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description of promotion 1.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to="/product-listing" size="small" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image="https://via.placeholder.com/300"
                    alt="Promotion 2"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Promotion 2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description of promotion 2.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to="/product-listing" size="small" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image="https://via.placeholder.com/300"
                    alt="Promotion 3"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Promotion 3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description of promotion 3.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to="/product-listing" size="small" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
  );
}

export default HomePage;
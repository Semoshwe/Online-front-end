import { Component } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

class ProductReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: '',
            review: '',
            rating: 0
        };
    }

    handleRatingChange = (event, newValue) => {
        this.setState({ rating: newValue });
    };

    render() {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Rating &amp; Reviews
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Review This Item
                </Typography>
                <Paper elevation={1} sx={{ p: 3, mb: 1 }}>
                    <Box component="form" noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            label="Product Name"
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Write Something"
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <Typography component="legend">Rating</Typography>
                        <Rating
                            name="rating"
                            value={this.state.rating}
                            onChange={this.handleRatingChange}
                            precision={1}
                        />
                        <br />
                        <Button
                            component={Link} to="/product-detail"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Submit Review
                        </Button>
                    </Box>
                </Paper>
                <Typography variant="body1">
                    Rating: {this.state.rating}
                </Typography>
            </Container>
        );
    }
}

export default ProductReview;
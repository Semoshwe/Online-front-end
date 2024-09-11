import { Component } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

class ProductReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            customerName: '',
            review: '',
            rating: 0,
            successMessage: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleRatingChange = (event, newValue) => {
        this.setState({ rating: newValue });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { productName, customerName, review, rating } = this.state;

        fetch('http://localhost:8080/shopping_store/productReview/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productName,
                customerName,
                review,
                rating
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then(err => { throw new Error(err.message || 'Network response was not ok.') });
            })
            .then(data => {
                console.log('Success:', data);
                this.setState({ successMessage: 'Review submitted successfully!' }); // Update successMessage
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({ successMessage: `Failed to submit review: ${error.message}` }); // Update successMessage on error
            });
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
                    <Box component="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            variant="outlined"
                            margin="normal"
                            name="productName"
                            value={this.state.productName}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            margin="normal"
                            name="customerName"
                            value={this.state.customerName}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Your Review"
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            name="review"
                            value={this.state.review}
                            onChange={this.handleInputChange}
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
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Submit Review
                        </Button>
                    </Box>
                </Paper>
                {this.state.successMessage && (
                    <Typography variant="body1" color="success.main">
                        {this.state.successMessage}
                    </Typography>
                )}
                <Typography variant="body1">
                    Rating: {this.state.rating}
                </Typography>
            </Container>
        );
    }
}

export default ProductReview;
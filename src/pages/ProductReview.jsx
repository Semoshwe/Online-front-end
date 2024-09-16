import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Rating } from '@mui/material';

function ProductReview() {
    const [productName, setProductName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'productName') setProductName(value);
        if (name === 'customerName') setCustomerName(value);
        if (name === 'review') setReview(value);
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
                setSuccessMessage('Review submitted successfully!');
            })
            .catch((error) => {
                console.error('Error:', error);
                setSuccessMessage(`Failed to submit review: ${error.message}`);
            });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Rating &amp; Reviews
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Review This Item
            </Typography>
            <Paper elevation={1} sx={{ p: 3, mb: 1 }}>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Product Name"
                        variant="outlined"
                        margin="normal"
                        name="productName"
                        value={productName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        margin="normal"
                        name="customerName"
                        value={customerName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        label="Your Review"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        name="review"
                        value={review}
                        onChange={handleInputChange}
                    />
                    <Typography component="legend">Rating</Typography>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={handleRatingChange}
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
            {successMessage && (
                <Typography variant="body1" color="success.main">
                    {successMessage}
                </Typography>
            )}
            <Typography variant="body1">
                Rating: {rating}
            </Typography>
        </Container>
    );
}

export default ProductReview;
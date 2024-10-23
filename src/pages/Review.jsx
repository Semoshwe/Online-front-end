import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, Rating, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ReviewService from '../services/reviewService';
import { readProduct } from '../services/productService';

const temporaryUser = {
    userID: 1,
    firstName: "Mthandeni",
    lastName: "Mbobo"
};

function Review() {
    const { productId } = useParams();
    const [productName, setProductName] = useState('');
    const [productData, setProductData] = useState(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await readProduct(productId);
                setProductData(data);
                setProductName(data.name);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
                setDialogMessage('Failed to load product details');
                setDialogOpen(true);
            }
        };

        if (productId) fetchProduct().then(r => r);
    }, [productId]);

    const handleReviewChange = (event) => setReview(event.target.value);
    const handleRatingChange = (event, newValue) => setRating(newValue);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!productData) {
            setDialogMessage('Failed to load product details');
            setDialogOpen(true);
            return;
        }

/*        const reviewData = {
            rating,
            review,
            product: {
                productId: readProduct(productId).id
            },
            userId: temporaryUser.userID
        };*/

        const reviewData = {
            rating,
            review,
            productId,
            userId: temporaryUser.userID
        };

        try {
            await ReviewService.createReview(reviewData);
            setDialogMessage('Review submitted successfully!');
            setReview('');
            setRating(0);
        } catch (error) {
            console.error('Failed to submit review:', error);
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            setDialogMessage(`Failed to submit review: ${errorMessage}`);
        }
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>Reviewing {productName}</Typography>
            <Paper elevation={1} sx={{ p: 3, mb: 1 }}>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField fullWidth label="Product Name" variant="outlined" margin="normal" value={productName} disabled />
                    <TextField fullWidth label="First Name" variant="outlined" margin="normal" value={temporaryUser.firstName} disabled />
                    <TextField fullWidth label="Last Name" variant="outlined" margin="normal" value={temporaryUser.lastName} disabled />
                    <TextField fullWidth label="Your Review" variant="outlined" margin="normal" multiline rows={4} value={review} onChange={handleReviewChange} />
                    <Typography component="legend">Rating</Typography>
                    <Rating name="rating" value={rating} onChange={handleRatingChange} precision={1} />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" color="primary">Submit Review</Button>
                    </Box>
                </Box>
            </Paper>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Notification</DialogTitle>
                <DialogContent>
                    <Typography>{dialogMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Review;
import { Component } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Import Icon for upload button
import { uploadFileToS3 } from "../services/S3Service.js";

class ProductCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: '',
            stock: '',
            categoryId: '',
            imageFile: null, // Holds the file to upload
            imagePreviewUrl: '', // URL to preview the image before uploading
            successMessage: '',
            errorMessage: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { name, description, price, stock, categoryId, imageFile } = this.state;

        try {
            let imagePath = '';

            // Ensure an image is selected before proceeding
            if (imageFile) {
                // Upload the file to S3 and get the URL
                const uploadedImageUrl = await uploadFileToS3(imageFile);
                imagePath = uploadedImageUrl; // Save the URL in imagePath
            } else {
                throw new Error('Please select an image to upload.');
            }

            // Proceed with the product creation, including the imagePath
            const productData = {
                name,
                description,
                price: parseFloat(price), // Ensure price is a number
                stock: parseInt(stock, 10), // Ensure stock is an integer
                categoryId,
                imagePath // Use the URL from S3
            };

            const response = await fetch('http://localhost:8080/shopping_store/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                this.setState({ successMessage: 'Product created successfully!', errorMessage: '' });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok.');
            }
        } catch (error) {
            console.error('Error:', error);
            this.setState({ successMessage: '', errorMessage: `Failed to create product: ${error.message}` });
        }
    };

    fileSelectHandler = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Release the object URL if it exists
            if (this.state.imagePreviewUrl) {
                URL.revokeObjectURL(this.state.imagePreviewUrl);
            }

            const imagePreviewUrl = URL.createObjectURL(file);
            this.setState({ imageFile: file, imagePreviewUrl });
        }
    };

    render() {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create Product
                </Typography>
                <Paper elevation={1} sx={{ p: 3, mb: 1 }}>
                    <Box component="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        {/* Image upload input */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Upload Product Image
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <IconButton
                                    color="primary"
                                    aria-label="upload image"
                                    component="label"
                                >
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={this.fileSelectHandler}
                                    />
                                    <PhotoCameraIcon />
                                </IconButton>
                            </Box>
                            {this.state.imagePreviewUrl && (
                                <img
                                    src={this.state.imagePreviewUrl}
                                    alt="Product Preview"
                                    style={{ width: '100%', marginTop: '10px' }}
                                />
                            )}
                        </Box>

                        <TextField
                            fullWidth
                            label="Name of product"
                            variant="outlined"
                            margin="normal"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            margin="normal"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            variant="outlined"
                            margin="normal"
                            name="price"
                            type="number"
                            value={this.state.price}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Stock"
                            variant="outlined"
                            margin="normal"
                            name="stock"
                            type="number"
                            value={this.state.stock}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Category ID"
                            variant="outlined"
                            margin="normal"
                            name="categoryId"
                            value={this.state.categoryId}
                            onChange={this.handleInputChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Create Product
                        </Button>
                    </Box>
                </Paper>
                {this.state.successMessage && (
                    <Typography variant="body1" color="success.main">
                        {this.state.successMessage}
                    </Typography>
                )}
                {this.state.errorMessage && (
                    <Typography variant="body1" color="error.main">
                        {this.state.errorMessage}
                    </Typography>
                )}
            </Container>
        );
    }
}

export default ProductCreate;

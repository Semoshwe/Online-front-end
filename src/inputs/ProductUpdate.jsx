import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import { Container, TextField, Button, Typography, Box, Paper, IconButton, Grid, Divider } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Import Icon for upload button
import { uploadFileToS3 } from "../services/S3Service.js";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

class ProductUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: '',
            name: '',
            description: '',
            price: '',
            stock: '',
            categoryId: '',
            createdAt: '',
            updatedAt: '',
            imageFiles: [],
            imagePreviewUrls: [],
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
        const { name, description, price, stock, categoryId, imageFiles } = this.state;

        try {
            let imagePaths = {};

            if (imageFiles.length > 0) {
                for (let i = 0; i < imageFiles.length; i++) {
                    const uploadedImageUrl = await uploadFileToS3(imageFiles[i]);
                    imagePaths[`imageUrl${i + 1}`] = uploadedImageUrl;
                }
            } else {
                throw new Error('Please select up to 4 images to upload.');
            }

            const currentDateTime = new Date().toISOString();

            const productData = {
                productId: null,
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock, 10),
                categoryId,
                createdAt: currentDateTime,
                updatedAt: currentDateTime,
                images: imagePaths
            };

            const response = await fetch('http://localhost:8080/shopping_store/product/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                const data = await response.json();
                this.setState({ successMessage: 'Product updated successfully!', errorMessage: '' });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok.');
            }
        } catch (error) {
            this.setState({ successMessage: '', errorMessage: `Failed to update product: ${error.message}` });
        }
    };

    fileSelectHandler = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 4) {
            this.setState({ errorMessage: 'You can upload a maximum of 4 images.', imageFiles: [], imagePreviewUrls: [] });
            return;
        }

        const imagePreviewUrls = files.map(file => URL.createObjectURL(file));
        this.setState({ imageFiles: files, imagePreviewUrls });
    };

    render() {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Update Product
                </Typography>
                <Paper elevation={1} sx={{ p: 3, mb: 1 }}>
                    <Box component="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Upload Product Images (Max 4)
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <IconButton
                                    color="primary"
                                    aria-label="upload images"
                                    component="label"
                                >
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={this.fileSelectHandler}
                                        multiple
                                    />
                                    <PhotoCameraIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                                {this.state.imagePreviewUrls.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Product Preview ${index + 1}`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                ))}
                            </Box>
                        </Box>
                        <TextField
                            fullWidth
                            label="Product ID"
                            variant="outlined"
                            margin="normal"
                            name="productId"
                            value={this.state.productId}
                            onChange={this.handleInputChange}
                        />
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
                        <TextField
                            fullWidth
                            label="Created date"
                            variant="outlined"
                            margin="normal"
                            name="createdAt"
                            value={this.state.createdAt}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Updated date"
                            variant="outlined"
                            margin="normal"
                            name="updatedAfter"
                            value={this.state.updatedAt}
                            onChange={this.handleInputChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Update Product
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

export default function CSSGrid() {
    return (
        <Box sx={{ width: 1 }}>
            <Box sx={{ display: 'grid', gap: 1 }}>
                <Box sx={{ gridColumn: 'span 8' }}>
                    <Grid container direction="column" sx={{ justifyContent: 'center' }}>
                        <ProductUpdate />
                        <Grid container spacing={1} sx={1}>
                            {[0, 1, 2].map((value) => (
                                <Grid key={value} item>
                                    <Item />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

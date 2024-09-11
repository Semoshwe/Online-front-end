import { Component } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

class ProductCreate extends Component {
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
            imagePath: '',
            successMessage: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { productId, name, description, price, stock, categoryId, createdAt, updatedAt, imagePath} = this.state;

        fetch('http://localhost:8080/store/product/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId,
                name,
                description,
                price,
                stock,
                categoryId,
                createdAt,
                updatedAt,
                imagePath
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
                this.setState({ successMessage: 'Product created successfully!' });
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({ successMessage: `Failed to create product: ${error.message}` });
            });
    };

    render() {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create Product
                </Typography>
                <Paper elevation={1} sx={{ p: 3, mb: 1 }}>
                    <Box component="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        {/*<TextField*/}
                        {/*    fullWidth*/}
                        {/*    label="Product ID"*/}
                        {/*    variant="outlined"*/}
                        {/*    margin="normal"*/}
                        {/*    name="productId"*/}
                        {/*    value={this.state.productId}*/}
                        {/*    onChange={this.handleInputChange}*/}
                        {/*/>*/}
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
                            value={this.state.price}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Stock"
                            variant="outlined"
                            margin="normal"
                            name="stock"
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
                            name="updatedAt"
                            value={this.state.updatedAt}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Image path"
                            variant="outlined"
                            margin="normal"
                            name="imagePath"
                            value={this.state.imagePath}
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
            </Container>
        );
    }
}

export default ProductCreate;
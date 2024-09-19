import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button, Grid} from "@mui/material";
import * as React from "react";
import {readProduct} from "../services/ProductService.js";

export default function ProductRead() {
    const [productID, setProductID] = React.useState('');
    const[product, setProduct] = React.useState(null); // Stores fetched product
    const[error, setError] = React.useState(null);

    const handleFetchProduct = async () => {
        try{
            const response = await readProduct(productID);
            setProduct(response);
            console.log('Fetched product: ', response.data);
        } catch (error) {
            setError('Error fetching product: ' + error.message);
            setProduct(null); // Clears product if error occurs
        }
    };

    const handleProductIDChange = (event) => {
        setProductID(event.target.value);
    };

    return (
        <div>
        <Box>
            <TextField
                label="Product ID"
                value={productID}
                onChange={handleProductIDChange}
                margin="normal"
            />
            <Button
            variant="contained"
            sx={{ width: 250, height: 56, margin: 2}}
            onClick={handleFetchProduct()}
            >
                Read ID
            </Button>
            {product && (
                <Grid container spacing={1}>
                    <Card sm={6} md={4}>
                        <CardMedia
                            component="img"
                            alt={product.name}
                            height="500"
                            image={product.images?.imageUrl1}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                                Product ID: {product.id}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Name: {product.name}
                            </Typography>
                            <Typography variant="body2" component="div">
                                Description: {product.description}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Price: ${product.price}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Stock: {product.stock}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Category ID: {product.categoryId}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Created date: {product.createdAt}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Updated date: {product.updatedAt}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Box>
        </div>
    );
}
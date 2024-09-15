import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
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

        // event.preventDefault();
        // const { productId, name, description, price, stock, categoryId, createdAt, updatedAt, imagePath} = this.state;

        // fetch('http://localhost:9090/shopping_store/product/read'+ productId, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        //     })
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
            {error && (
                <Typography color="error" variant="body2" sx={{ margin: 2 }}>
                    {error}
                </Typography>
            )}
            {product && (
                <Card sx={{ maxWidth: 345, margin: 2 }}>
                    <CardMedia
                        component="img"
                        alt={product.name}
                        height="140"
                        image={product.imagePath || "/static/images/cards/contemplative-reptile.jpg"} // Use the product image URL or fallback
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
                    <CardActions>
                        {/* Add actions like Edit, Delete, etc. */}
                    </CardActions>
                </Card>
            )}
        </Box>
        </div>
    );
}
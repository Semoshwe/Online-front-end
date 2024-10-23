import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import * as React from "react";
import { getProductsByPriceRange } from "../services/ProductService.js";
import Slider from '@mui/material/Slider';

export default function ProductPriceRange() {
    const [products, setProducts] = React.useState([]); // Stores fetched products as an array
    const [error, setError] = React.useState(null);

    const MIN = 50;
    const MAX = 1000;
    const [value, setValue] = React.useState([100, 500]); // Initial price range

    // Handle slider change
    const handleChange = (event, newValue) => {
        setValue(newValue); // Update state with new slider values
    };

    // Fetch products based on selected price range
    const handleFetchProduct = async () => {
        const [minPrice, maxPrice] = value; // Destructure value array into minPrice and maxPrice
        try {
            const response = await getProductsByPriceRange(minPrice, maxPrice);
            setProducts(response); // Set products from API response
            console.log('Fetched products: ', response);
        } catch (error) {
            setError('Error fetching products: ' + error.message);
            setProducts([]); // Clear products if an error occurs
        }
    };

    return (
        <div>
            <Box>
                {/* Slider for price range */}
                <Box sx={{ width: '50%', padding: 2, margin: 2 }}>
                    <Typography variant="h4">Price between</Typography>
                    <Slider
                        value={value} // Bind slider value to state
                        min={MIN}
                        max={MAX}
                        valueLabelDisplay="auto"
                        onChange={handleChange} // Handle slider changes
                    />
                    <Typography variant={"h6"}>
                        Selected Range: R{value[0]} - R{value[1]}
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    sx={{ width: 250, height: 56, margin: 2 }}
                    onClick={handleFetchProduct} // Fetch products based on slider values
                >
                    Show Products
                </Button>

                {/* Render products if available */}
                {products.length > 0 ? (
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt={product.name}
                                        height="500"
                                        image={product.images?.imageUrl1 || '/placeholder.png'}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="body2" component="div">
                                            Product ID: {product.productId}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div">
                                            Name: {product.name}
                                        </Typography>
                                        <Typography variant="body2" component="div">
                                            Description: {product.description}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div">
                                            Price: R{product.price}
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
                        ))}
                    </Grid>
                ) : (
                    error && <Typography color="error">{error}</Typography>
                )}
            </Box>
        </div>
    );
}
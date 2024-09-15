import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import CartContext from '../context/CartContext';
import ProductGetAll from "../inputs/ProductGetAll.jsx";
import ProductRead from "../inputs/ProductRead.jsx";
import ProductCreate from "../inputs/ProductCreate.jsx";
import ProductUpdate from "../inputs/ProductUpdate.jsx";

//import jeanImage from './assets/W_952737_149_2.jpg';
//import tshirtImage from './assets/t-shirt.jpg';

// const products = [
//   {
//     id: 1,
//     name: 'Jean',
//     description: 'Comfortable and stylish blue denim jeans.',
//     price: 599.99,
//     //image: jeanImage,
//   },
//   {
//     id: 2,
//     name: 'T-Shirt',
//     description: 'Classic white t-shirt made from 100% cotton.',
//     price: 199.99,
//     //image: tshirtImage,
//   },
// ];


function ProductsPage() {
  const [value, setValue] = React.useState(0);
  // const { addToCart } = React.useContext(CartContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleAddToCart = (product) => {
  //   addToCart(product);
  //   alert(`${product.name} has been added to your cart!`);
  // };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="70vw">
        <Box sx={{ bgcolor: '#cfe8fc', minHeight: '100vh', pt: 4, textAlign: 'center' }}>
          <Typography variant="h1" gutterBottom>
            Products
          </Typography>
          <Card>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Tab label="Create" />
              <Tab label="Read" />
              <Tab label="Update" />
              <Tab label="Get All" />
            </Tabs>
            <CardContent>
              {value === 0 && <ProductCreate />}
              {value === 1 && <ProductRead />}
              {value === 2 && <ProductUpdate />}
              {value === 3 && <ProductGetAll />}
              {/*<Grid container spacing={4} sx={{ mt: 4 }}>*/}
              {/*  {products.map((product) => (*/}
              {/*    <Grid item xs={12} sm={6} md={4} key={product.id}>*/}
              {/*      <Card>*/}
              {/*        <CardMedia*/}
              {/*          component="img"*/}
              {/*          height="140"*/}
              {/*          image={product.image}*/}
              {/*          alt={product.name}*/}
              {/*        />*/}
              {/*        <CardContent>*/}
              {/*          <Typography variant="h5" component="div">*/}
              {/*            {product.name}*/}
              {/*          </Typography>*/}
              {/*          <Typography variant="body2" color="text.secondary">*/}
              {/*            {product.description}*/}
              {/*          </Typography>*/}
              {/*          <Typography variant="h6" component="div">*/}
              {/*            R{product.price.toFixed(2)}*/}
              {/*          </Typography>*/}
              {/*          <Button*/}
              {/*            variant="contained"*/}
              {/*            color="primary"*/}
              {/*            sx={{ mt: 2 }}*/}
              {/*            onClick={() => handleAddToCart(product)}*/}
              {/*          >*/}
              {/*            Add to Cart*/}
              {/*          </Button>*/}
              {/*        </CardContent>*/}
              {/*      </Card>*/}
              {/*    </Grid>*/}
              {/*  ))}*/}
              {/*</Grid>*/}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default ProductsPage;

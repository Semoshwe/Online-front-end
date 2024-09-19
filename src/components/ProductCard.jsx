import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function ProductCard({ product, quantity, productId, totalPrice }) {
  const totalAmount = product.price * quantity; // Calculate total amount

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={product.images.imageUrl1} // Display the first image from the product images
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Price: R{product.price}</Button>
        <Button size="small">Quantity: {quantity}</Button> {/* Show the quantity */}
        <Button size="small">Total: R {totalAmount}</Button> {/* Show total amount */}
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  productId: PropTypes.number.isRequired,
  totalPrice: PropTypes.number // Optional if not used
};

import { useContext } from 'react'; // Import React and useContext
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button'; // Import Button component
//import OrderContext from './context/OrderContext'; // Ensure the path is correct

function OrderItems() {
  const { orderItems, removeItem } = useContext(OrderContext); // Destructure removeItem from context

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Items in Your Order
      </Typography>
      <List>
        {orderItems?.length === 0 ? (
          <Typography>No items in your order.</Typography>
        ) : (
          orderItems.map((item) => (
            <ListItem key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '50px', height: '50px', marginRight: '15px' }}
              />
              <ListItemText
                primary={`${item.name} (x${item.quantity})`}
                secondary={`Price: R${item.price * item.quantity}`}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  const confirmDelete = window.confirm("Are you sure you want to remove this item?");
                  if (confirmDelete) {
                    removeItem(item.id); // Only call removeItem if the user confirms
                  }
                }}
              >
                Remove
              </Button>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
}

export default OrderItems;

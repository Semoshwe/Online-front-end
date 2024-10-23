import { useContext, useState } from 'react'; 
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button'; 
import CartContext from '../context/CartContext'; 
import { createCartItem, getCartItemsByCartID } from '../services/CartItemService'; 
import { getCartsByUserID } from '../services/CartService'; 
import { useAuth } from '../context/AuthContext'; 
import { useQuery, useMutation, useQueryClient } from 'react-query';

function CartItems() {
  const { cartItems, removeItem } = useContext(CartContext);
  const { currentUser } = useAuth(); 
  const [cartID, setCartID] = useState(null); // State for the cart ID
  const queryClient = useQueryClient(); // Create a query client instance

  // Step 1: Fetch the cart for the user (using React Query instead of useEffect)
  useQuery(
    ['userCarts', currentUser?.userID], // Unique key based on user ID
    () => getCartsByUserID(currentUser.userID), // Fetch carts by user ID
    {
      enabled: !!currentUser, // Only run the query if the user exists
      onSuccess: (data) => {
        if (data.length > 0) {
          setCartID(data[0].id); // Assume only one cart per user
        }
      },
      onError: (error) => {
        console.error('Error fetching cart:', error);
      }
    }
  );

  // Step 2: Fetch cart items based on cartID
  const { data: userCartItems = [], isLoading: itemsLoading } = useQuery(
    ['cartItems', cartID], 
    () => getCartItemsByCartID(cartID), 
    {
      enabled: !!cartID, // Only fetch if cartID exists
      onError: (error) => {
        console.error('Error fetching cart items:', error);
      }
    }
  );

  // Step 3: Store new cart items in the CartItem table (using useMutation)
  const mutation = useMutation(
    (newCartItem) => createCartItem(newCartItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cartItems', cartID]); // Refresh cart items after mutation
        console.log("Cart item stored successfully");
      },
      onError: (error) => {
        console.error("Error adding items to the database:", error);
      }
    }
  );

  // Adding items to the cart database (executed manually when needed)
  const addItemsToDB = () => {
    if (!cartID || cartItems.length === 0) return;

    cartItems.forEach((item) => {
      const newCartItem = {
        productId: item.productId,
        price: item.price,
        cartId: cartID,
      };

      mutation.mutate(newCartItem); // Trigger mutation to save item to the DB
    });
  };

  // Combine userCartItems from DB and cartItems from CartContext
  const combinedCartItems = [...userCartItems, ...cartItems];

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Items in Your Cart
      </Typography>
      {itemsLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <List>
          {combinedCartItems.length === 0 ? (
            <Typography>No items in your cart.</Typography>
          ) : (
            combinedCartItems.map((item) => (
              <ListItem key={item.productId}>
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
                      removeItem(item.productId); // Remove item from cart
                    }
                  }}
                >
                  Remove
                </Button>
              </ListItem>
            ))
          )}
        </List>
      )}

      {/* Button to trigger saving the cart items to the database */}
      <Button variant="contained" onClick={addItemsToDB}>
        Save Cart Items
      </Button>
    </div>
  );
}

export default CartItems;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import OrderItems from './pages/OrderItems.jsx'; 
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import ProductListingPage from './pages/ProductListingPage.jsx';
import ProductImagePage from './pages/ProductImagePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { CartProvider } from './context/CartContext';
import Review from './pages/Review.jsx';
import ProductDetailPage from './pages/ProductDetailPage';
import { AuthProvider } from './context/AuthContext';
import ProductCard from './components/ProductCard.jsx';
import SkeletonCard from './components/SkeletonCard.jsx';
import BreadCrumbs from './components/BreadCrumbs';
import Profile from './pages/Profile';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();


function App() {
  return (
    <Router> {/* Router should be the outermost */}
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CartProvider>
          <AuthProvider> 
            <div className="main" style={{ width: '100%', justifyContent: 'center' }}>
              {/* App Bar */}
              <PrimarySearchAppBar />
              <BreadCrumbs sx={{ marginTop: '10px', paddingLeft: '20px' }} /> {/* Add some margin or padding for better spacing */}

              {/* Main Content */}
              <div style={{ padding: '20px' }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/items/product" element={<ProductCard />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/skeleton" element={<SkeletonCard />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product-image" element={<ProductImagePage />} />
                  <Route path="/orders/:orderID/items" element={<OrderItems />} />
                  <Route path="/order-items/:orderID" element={<OrderItems />} />
                  <Route path="/product-listing" element={<ProductListingPage />} />
                  <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
                  <Route path="/product-review/:productId"  element={<Review />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
            </div>
          </AuthProvider>
        </CartProvider>
      </LocalizationProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;

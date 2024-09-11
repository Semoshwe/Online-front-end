import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import ProductImagePage from './pages/ProductImagePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { CartProvider } from './context/CartContext';
import ProductReview from './pages/ProductReview';

function App() {
  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CartProvider>
      <div className="main" style={{ width: "100%", justifyContent: "center" }}>
        <PrimarySearchAppBar />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product-image" element={<ProductImagePage />} />
              <Route path="/product-review" element={<ProductReview />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

          </Routes>
        </div>
      </div>
      </CartProvider>
      </LocalizationProvider>
    </Router>



  );
}

export default App;

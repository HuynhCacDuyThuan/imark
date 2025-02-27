import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import ForgotPassword from './user/Forgot';
import Register from './user/Register';
import Home from './user/Home';
import Profile from './user/Profile';
import CartAll from './user/CartAll';
import ProductDetails from './user/ProductDetails';
import AddProduct from './admin/AddProduct';
import AdminPage from './admin/Admin';
import OTPVerification from './user/OTPVerification';
import EditProduct from './admin/EditProduct';
import Search from './user/Search';
import CategoryPage from './user/CategoryPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<CartAll />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:id" element={<CategoryPage />} /> {/* Route mới */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

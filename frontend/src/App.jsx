import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import './app.css';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import MenuPage from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import AddItem from './pages/AddItem';
import Cart from './pages/Cart';
import AdminLogin from './pages/AdminLogin';
import OpenMapsToHotel from './pages/OpenMapsToHotel';
import AdminOrders from './pages/AdminOrders.jsx';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* User Routes */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/OpenMapsToHotel" element={<OpenMapsToHotel />} />
              
            </Route>

            {/* Admin Login Route */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/admin" element={<AddItem />} />
              <Route path="/AdminOrders" element={<AdminOrders />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

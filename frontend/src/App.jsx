import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './app.css';
import UserLayout from './layouts/UserLayout';

import Home from './pages/Home';
import MenuPage from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import OpenMapsToHotel from './pages/OpenMapsToHotel';

const App = () => {
  return (
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
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;


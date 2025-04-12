import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import AddItem from './pages/AddItem';
import Cart from './pages/Cart';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Route - Always accessible */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AddItem />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import AddItem from './pages/AddItem';
import Cart from './pages/Cart';
import AdminLogin from './pages/AdminLogin';
import OpenMapsToHotel from './pages/OpenMapsToHotel';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/OpenMapsToHotel" element={<OpenMapsToHotel />} />
          </Route>

          {/* Admin Login Route */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
             <Route element={
                          <ProtectedRoute>
                            <AdminLayout />
                          </ProtectedRoute>
                        }>
                <Route path="/admin" element={<AddItem />} />
             </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
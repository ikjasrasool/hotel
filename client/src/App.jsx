import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './app.css';
import AdminLayout from './layouts/AdminLayout';

import AddItem from './pages/AddItem';
import AdminLogin from './pages/AdminLogin';
import AdminOrders from './pages/AdminOrders.jsx';
import Analytics from './pages/Analytics';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect root to admin */}
          <Route path="/" element={<Navigate to="/admin" replace />} />

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
            <Route path="/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

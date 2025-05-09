import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const AdminHeader = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <nav className="flex gap-4">
          <Link to="/admin" className="text-white hover:underline">Add Item</Link>
          <button onClick={handleLogout} className="text-white hover:underline">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;

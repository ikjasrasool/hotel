import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header className="bg-gray-800 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <nav>
          <Link to="/admin" className="text-white hover:underline">Add Item</Link>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;

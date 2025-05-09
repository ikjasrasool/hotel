import React from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminHeader />
      <main className="flex-1 container mx-auto py-8">
        <Outlet />
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;

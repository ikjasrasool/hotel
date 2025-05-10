import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import MobileNavigation from '../components/MobileNavigation';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminHeader />
      
      <main className="flex-grow container-fluid mx-auto py-4 md:py-6 safe-bottom">
        <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 md:px-6">
          <Outlet />
        </div>
      </main>

      <MobileNavigation />
      
      <div className="hidden md:block">
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;

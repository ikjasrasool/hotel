import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileNavigation from '../components/MobileNavigation';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-6">
        <Outlet />
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default UserLayout;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNavigation = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  return (
    <div className="md:hidden flex justify-between bg-white border-t p-4 text-sm">
      <Link
        to="/"
        className={`${activeTab === '/' ? 'text-red-600' : 'text-gray-600'}`}
      >
        Home
      </Link>
      <Link
        to="/menu"
        className={`${activeTab === '/menu' ? 'text-red-600' : 'text-gray-600'}`}
      >
        Menu
      </Link>
      <Link
        to="/about"
        className={`${activeTab === '/about' ? 'text-red-600' : 'text-gray-600'}`}
      >
        About
      </Link>
      <Link
        to="/contact"
        className={`${activeTab === '/contact' ? 'text-red-600' : 'text-gray-600'}`}
      >
        Contact
      </Link>
    </div>
  );
};

export default MobileNavigation;

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-red-700 to-red-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold truncate">Saravana Bhavan Admin</h1>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/admin"
              className={`px-4 py-2 rounded-md transition-colors duration-200 hover:bg-red-800 flex items-center ${
                isActive('/admin') ? 'bg-red-800' : ''
              }`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Menu Items
            </Link>
            <Link
              to="/AdminOrders"
              className={`px-4 py-2 rounded-md transition-colors duration-200 hover:bg-red-800 flex items-center ${
                isActive('/AdminOrders') ? 'bg-red-800' : ''
              }`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Orders
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-200 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-2 px-2 space-y-1">
            <Link
              to="/admin"
              className={`block px-4 py-2 rounded-md transition-colors duration-200 hover:bg-red-800 mb-2 ${
                isActive('/admin') ? 'bg-red-800' : ''
              }`}
            >
              Menu Items
            </Link>
            <Link
              to="/AdminOrders"
              className={`block px-4 py-2 rounded-md transition-colors duration-200 hover:bg-red-800 mb-2 ${
                isActive('/AdminOrders') ? 'bg-red-800' : ''
              }`}
            >
              Orders
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;


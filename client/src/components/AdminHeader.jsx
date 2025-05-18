import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

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

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
      <header className="bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white shadow-xl">
        {/* Top status bar */}
        <div className="bg-red-900 py-1 px-4 text-xs md:text-sm flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="hidden md:inline">Today: </span>
              <span className="font-medium ml-1">{formatDate(currentTime)}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
              <span>System Online</span>
            </div>
          </div>
        </div>

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16 md:h-20">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center">

              <div>
                <h1 className="text-xl font-bold">Saravana Bhavan</h1>
                <p className="text-xs text-red-200">Admin Dashboard</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
              <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-red-800 flex items-center ${
                      isActive('/admin') ? 'bg-red-800 shadow-inner' : ''
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Menu Items
              </Link>
              <Link
                  to="/AdminOrders"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-red-800 flex items-center ${
                      isActive('/AdminOrders') ? 'bg-red-800 shadow-inner' : ''
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Orders
              </Link>
              <Link
                  to="/analytics"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-red-800 flex items-center ${
                      isActive('/analytics') ? 'bg-red-800 shadow-inner' : ''
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </Link>

              {/* User Profile */}
              <div className="relative ml-3">
                <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-red-800 focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center mr-2">
                    <span className="font-bold">SB</span>
                  </div>
                  <span className="hidden lg:block">Logout</span>
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                    className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                    className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                  to="/admin"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center ${
                      isActive('/admin')
                          ? 'bg-red-800 text-white'
                          : 'text-white hover:bg-red-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Menu Items
              </Link>
              <Link
                  to="/AdminOrders"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center ${
                      isActive('/AdminOrders')
                          ? 'bg-red-800 text-white'
                          : 'text-white hover:bg-red-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Orders
              </Link>
              <Link
                  to="/analytics"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center ${
                      isActive('/analytics')
                          ? 'bg-red-800 text-white'
                          : 'text-white hover:bg-red-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </Link>
              <div className="pt-4 pb-3 border-t border-red-800">
                <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumb navigation */}
        <div className="bg-red-800 py-2 px-4 sm:px-6 lg:px-8 text-sm hidden md:block">
          <div className="max-w-7xl mx-auto flex space-x-2 text-red-200">
            <Link to="/admin" className="hover:text-white">Dashboard</Link>
            <span>/</span>
            <span className="text-white font-medium">
            {location.pathname === "/admin" && "Menu Items"}
            {location.pathname === "/AdminOrders" && "Orders"}
            {location.pathname === "/analytics" && "Analytics"}
          </span>
          </div>
        </div>
      </header>
  );
};

export default AdminHeader;


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const activeTab = location.pathname;
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-red-600">
            Saravana <span className="text-orange-500">Bhavan</span>
          </h1>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 items-center">
              <li><Link to="/" className={activeTab === '/' ? 'text-red-600 font-bold' : 'text-gray-600'}>Home</Link></li>
              <li><Link to="/menu" className={activeTab === '/menu' ? 'text-red-600 font-bold' : 'text-gray-600'}>Menu</Link></li>
              <li><Link to="/about" className={activeTab === '/about' ? 'text-red-600 font-bold' : 'text-gray-600'}>About</Link></li>
              <li><Link to="/contact" className={activeTab === '/contact' ? 'text-red-600 font-bold' : 'text-gray-600'}>Contact</Link></li>
              <li><Link to="/OpenMapsToHotel" className={activeTab === '/OpenMapsToHotel' ? 'text-red-600 font-bold' : 'text-gray-600'}>Track Location</Link></li>
              <li>
                <Link to="/cart" className="relative text-gray-700 hover:text-red-600">
                  🛒
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-1">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 border-t pt-4">
            <ul className="flex flex-col space-y-4">
              <li><Link to="/" className={activeTab === '/' ? 'text-red-600 font-bold' : 'text-gray-600'} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link to="/menu" className={activeTab === '/menu' ? 'text-red-600 font-bold' : 'text-gray-600'} onClick={() => setIsMenuOpen(false)}>Menu</Link></li>
              <li><Link to="/about" className={activeTab === '/about' ? 'text-red-600 font-bold' : 'text-gray-600'} onClick={() => setIsMenuOpen(false)}>About</Link></li>
              <li><Link to="/contact" className={activeTab === '/contact' ? 'text-red-600 font-bold' : 'text-gray-600'} onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
              <li><Link to="/OpenMapsToHotel" className={activeTab === '/OpenMapsToHotel' ? 'text-red-600 font-bold' : 'text-gray-600'} onClick={() => setIsMenuOpen(false)}>Track Location</Link></li>
              <li>
                <Link to="/cart" className="relative inline-block text-gray-700 hover:text-red-600" onClick={() => setIsMenuOpen(false)}>
                  🛒 Cart
                  {totalItems > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const location = useLocation();
  const activeTab = location.pathname;
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 hidden md:block">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-red-600">
            Saravana <span className="text-orange-500">Bhavan</span>
          </h1>

          {/* Desktop Navigation */}
          <nav>
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
      </div>
    </header>
  );
};

export default Header;

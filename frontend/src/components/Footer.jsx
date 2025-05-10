import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-3">
              Saravana <span className="text-orange-400">Bhavan</span>
            </h3>
            <p className="text-gray-300">Delicious Meals, Right on Time!</p>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-orange-400 transition-colors">Menu</Link></li>
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-3">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center justify-center sm:justify-start">
                <span className="mr-2">📍</span>
                NH-44 Highway, Salem-Coimbatore Road
              </p>
              <p className="flex items-center justify-center sm:justify-start">
                <span className="mr-2">📞</span>
                +91 98765 43210
              </p>
              <p className="flex items-center justify-center sm:justify-start">
                <span className="mr-2">✉️</span>
                info@saravanabhavan.com
              </p>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© 2025 Saravana Bhavan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

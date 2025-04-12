import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3">
              Saravana <span className="text-orange-400">Bhavan</span>
            </h3>
            <p className="text-gray-300">Delicious Meals, Right on Time!</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Contact</h3>
            <p className="text-gray-300">NH-44 Highway, Salem-Coimbatore Road</p>
            <p className="text-gray-300">Phone: +91 98765 43210</p>
            <p className="text-gray-300">Email: info@saravanabhavan.com</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© 2025 Saravana Bhavan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

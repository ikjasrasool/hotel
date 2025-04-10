import React from 'react';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600">Saravana <span className="text-orange-500">Bhavan</span></h1>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <button
                  className={`${activeTab === 'home' ? 'text-red-600 font-bold' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className={`${activeTab === 'menu' ? 'text-red-600 font-bold' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('menu')}
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  className={`${activeTab === 'about' ? 'text-red-600 font-bold' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  className={`${activeTab === 'contact' ? 'text-red-600 font-bold' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
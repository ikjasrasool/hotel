import React from 'react';

const MobileNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="md:hidden flex justify-between bg-white border-t p-4">
      <button
        className={`text-center ${activeTab === 'home' ? 'text-red-600' : 'text-gray-600'}`}
        onClick={() => setActiveTab('home')}
      >
        Home
      </button>
      <button
        className={`text-center ${activeTab === 'menu' ? 'text-red-600' : 'text-gray-600'}`}
        onClick={() => setActiveTab('menu')}
      >
        Menu
      </button>
      <button
        className={`text-center ${activeTab === 'about' ? 'text-red-600' : 'text-gray-600'}`}
        onClick={() => setActiveTab('about')}
      >
        About
      </button>
      <button
        className={`text-center ${activeTab === 'contact' ? 'text-red-600' : 'text-gray-600'}`}
        onClick={() => setActiveTab('contact')}
      >
        Contact
      </button>
    </div>
  );
};

export default MobileNavigation;
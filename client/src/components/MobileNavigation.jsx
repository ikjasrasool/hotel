import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNavigation = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t safe-padding z-50">
      <div className="grid grid-cols-3 gap-2 p-2">
        <Link
          to="/admin"
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors touch-target ${
            activeTab === '/admin' 
              ? 'bg-red-50 text-red-600' 
              : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
          }`}
        >
          <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="text-xs font-medium">Menu Items</span>
        </Link>
        
        <Link
          to="/AdminOrders"
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors touch-target ${
            activeTab === '/AdminOrders'
              ? 'bg-red-50 text-red-600'
              : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
          }`}
        >
          <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-xs font-medium">Orders</span>
        </Link>

        <Link
          to="/analytics"
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors touch-target ${
            activeTab === '/analytics'
              ? 'bg-red-50 text-red-600'
              : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
          }`}
        >
          <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs font-medium">Analytics</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;

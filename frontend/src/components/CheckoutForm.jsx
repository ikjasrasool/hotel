import React, { useState } from 'react';

const CheckoutForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    age: '',
    busNumber: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="customerName"
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 transition-all duration-200"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 transition-all duration-200"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
        <input
          type="number"
          name="age"
          required
          min="1"
          max="120"
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 transition-all duration-200"
          value={formData.age}
          onChange={handleChange}
          placeholder="Your age"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Bus Number</label>
        <input
          type="text"
          name="busNumber"
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 transition-all duration-200"
          value={formData.busNumber}
          onChange={handleChange}
          placeholder="Enter bus number"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transform transition-all duration-300 ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-red-600 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Complete Order'
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;


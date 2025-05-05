import React, { useState } from 'react';
import { AlertCircle, Check, CreditCard, User, MapPin, Mail, Calendar, Bus } from 'lucide-react';

const CheckoutForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    age: '',
    busNumber: ''
  });
  
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [formTouched, setFormTouched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
    
    setFormTouched(true);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'customerName':
        return value.trim() === '' ? 'Name is required' : null;
      case 'email':
        return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'Valid email is required' : null;
      case 'age':
        return isNaN(value) || value <= 0 ? 'Valid age is required' : null;
      case 'busNumber':
        return value.trim() === '' ? 'Bus number is required' : null;
      default:
        return null;
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFocusedField(null);
    
    const error = validateField(name, value);
    if (error) {
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const handleFocus = (e) => {
    setFocusedField(e.target.name);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const inputClasses = (field) => `
    w-full px-4 py-3 rounded-lg border-2 
    ${errors[field] ? 'border-red-300 bg-red-50' : focusedField === field ? 'border-red-400 shadow-md' : 'border-gray-200'} 
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
    transition-all duration-200
  `;

  const labelClasses = (field) => `
    block mb-2 font-medium text-gray-700
    ${errors[field] ? 'text-red-600' : ''}
  `;

  const getIcon = (field) => {
    switch (field) {
      case 'customerName':
        return <User size={18} className={`text-gray-400 ${focusedField === field ? 'text-red-500' : ''}`} />;
      case 'email':
        return <Mail size={18} className={`text-gray-400 ${focusedField === field ? 'text-red-500' : ''}`} />;
      case 'age':
        return <Calendar size={18} className={`text-gray-400 ${focusedField === field ? 'text-red-500' : ''}`} />;
      case 'busNumber':
        return <Bus size={18} className={`text-gray-400 ${focusedField === field ? 'text-red-500' : ''}`} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg">
      {/* Checkout steps indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-medium">1</div>
            <p className="text-xs mt-1 font-medium text-red-600">Cart</p>
          </div>
          <div className="flex-1 h-1 mx-2 bg-red-600"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-medium">2</div>
            <p className="text-xs mt-1 font-medium text-red-600">Details</p>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-medium">3</div>
            <p className="text-xs mt-1 font-medium text-gray-500">Confirmation</p>
          </div>
        </div>
      </div>

      {/* Form info box */}
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
        <AlertCircle size={20} className="text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-800 text-sm">
            <span className="font-semibold">Please provide your details</span> to complete your order. Your information is securely processed.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Name Field */}
          <div>
            <label htmlFor="customerName" className={labelClasses('customerName')}>
              Full Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {getIcon('customerName')}
              </div>
              <input
                type="text"
                id="customerName"
                name="customerName"
                placeholder="Enter your full name"
                value={formData.customerName}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${inputClasses('customerName')} pl-10`}
              />
            </div>
            {errors.customerName && (
              <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className={labelClasses('email')}>
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {getIcon('email')}
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${inputClasses('email')} pl-10`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="age" className={labelClasses('age')}>
              Age
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {getIcon('age')}
              </div>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Your age"
                value={formData.age}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${inputClasses('age')} pl-10`}
              />
            </div>
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age}</p>
            )}
          </div>

          {/* Bus Number Field */}
          <div>
            <label htmlFor="busNumber" className={labelClasses('busNumber')}>
              Bus Number
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {getIcon('busNumber')}
              </div>
              <input
                type="text"
                id="busNumber"
                name="busNumber"
                placeholder="Enter bus number"
                value={formData.busNumber}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${inputClasses('busNumber')} pl-10`}
              />
            </div>
            {errors.busNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.busNumber}</p>
            )}
          </div>
        </div>

        {/* Payment method selection */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-red-500 rounded-lg p-4 cursor-pointer bg-red-50 relative">
              <div className="absolute top-3 right-3 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
              <div className="flex items-center">
                <CreditCard size={20} className="text-red-500 mr-3" />
                <span className="font-medium">Cash on Delivery</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 ml-8">Pay when your food arrives</p>
            </div>
            
            <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 hover:bg-gray-50 opacity-50">
              <div className="flex items-center">
                <CreditCard size={20} className="text-gray-400 mr-3" />
                <span className="font-medium text-gray-500">Online Payment</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 ml-8">Coming soon</p>
            </div>
          </div>
        </div>

        {/* Terms and conditions */}
        <div className="mt-6">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={true}
              readOnly
              className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the <a href="#" className="text-red-600 hover:text-red-700 font-medium">Terms & Conditions</a> and <a href="#" className="text-red-600 hover:text-red-700 font-medium">Privacy Policy</a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 transform hover:scale-[1.01]'}
              transition-all duration-300 shadow-lg hover:shadow-xl
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Order...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
        
        {/* Security badge */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center text-gray-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Your information is secure and encrypted</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
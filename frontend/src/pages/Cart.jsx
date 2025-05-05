import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Import for navigation

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const navigate = useNavigate(); // For navigation

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const taxAmount = totalAmount * 0.05;
  const finalAmount = totalAmount + taxAmount;

  const handlePlaceOrder = () => {
    // Generate a random order number
    const newOrderNumber = "ORD" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);

    // Clear the cart after successful order
    clearCart();
  };

  const handleNewOrder = () => {
    setOrderPlaced(false);
    navigate('/'); // Navigate to home page
  };

  // Handle quantity decrease
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item._id, item.quantity - 1);
    } else {
      removeFromCart(item._id);
    }
  };

  // Handle quantity increase with validation
  const increaseQuantity = (item) => {
    updateCartItemQuantity(item._id, item.quantity + 1);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Your order has been received and is being processed.</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 font-medium">Order Number:</p>
            <p className="text-lg font-bold text-gray-800">{orderNumber}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 font-medium">Total Amount:</p>
            <p className="text-lg font-bold text-gray-800">₹{finalAmount.toFixed(2)}</p>
          </div>

          <div className="text-sm text-gray-600 mb-6">
            <p>A confirmation has been sent to your email.</p>
            <p className="mt-1">Estimated delivery time: 30-45 minutes</p>
          </div>

          <button
            onClick={handleNewOrder}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-full"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Ordered Items</h2>
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <p className="text-lg text-gray-600">You have no orders right now</p>
          <p className="text-gray-500 mt-1">Add some delicious items to get started!</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Look into our Menu!!
          </button>
        </div>
      ) : (
        <div>
          <div className="border-b border-gray-200 pb-2 mb-4">
            <div className="grid grid-cols-12 text-sm font-medium text-gray-500">
              <div className="col-span-1">Image</div>
              <div className="col-span-5">Item</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <div key={item._id} className="grid grid-cols-12 items-center py-6 px-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="col-span-1">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/80/80";
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="col-span-5 ml-4">
                  <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                  {item.customization && (
                    <p className="text-sm text-gray-600 mt-1">{item.customization}</p>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  )}
                </div>

                <div className="col-span-2 flex justify-center items-center">
                  <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                    <button
                      className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                        item.quantity > 1 ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                      onClick={() => decreaseQuantity(item)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>

                    <span className="bg-white px-4 py-2 rounded-md text-center min-w-[48px] font-medium">
                      {item.quantity}
                    </span>

                    <button
                      className={`w-8 h-8 rounded-md flex items-center justify-center bg-green-500 text-white transition-colors ${
                        item.quantity < 10 ? 'hover:bg-green-600' : 'opacity-50 cursor-not-allowed'
                      }`}
                      onClick={() => increaseQuantity(item)}
                      disabled={item.quantity >= 10}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="col-span-2 text-right">
                  <p className="font-medium text-gray-800">₹{item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">per item</p>
                </div>

                <div className="col-span-1 text-right">
                  <p className="font-semibold text-green-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-xs text-gray-500">subtotal</p>
                </div>

                <div className="col-span-1 flex justify-end">
                  <button
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                    onClick={() => removeFromCart(item._id)}
                    aria-label="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes (5%)</span>
                <span className="font-medium">₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                <span className="text-lg font-bold text-gray-800">Total Amount</span>
                <span className="text-lg font-bold text-green-600">₹{finalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button
              onClick={() => navigate('/')}
              className="w-full md:w-1/3 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Continue Ordering
            </button>

            <button
              onClick={handlePlaceOrder}
              className="w-full md:w-2/3 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Proceed to Payment
            </button>
          </div>

          <div className="text-xs text-center text-gray-500 mt-3">
            By placing your order, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

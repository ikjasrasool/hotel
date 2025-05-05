import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      navigate('/');
      alert('Order placed successfully! Thank you for your order.');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src="https://img.freepik.com/free-vector/empty-shopping-cart-white_1308-56838.jpg"
            alt="Empty Cart"
            className="w-64 h-64 mx-auto mb-8"
          />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any delicious items yet!</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Cart ({totalItems} items)</h2>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 font-medium flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {cartItems.map((item) => (
                <div key={item._id} className="p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/128?text=Food";
                        }}
                      />
                      {item.isPopular && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg">Popular</span>
                      )}
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:text-red-600 hover:bg-red-50"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 border-x text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:text-red-600 hover:bg-red-50"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">₹{item.price} each</p>
                          <p className="text-lg font-semibold text-gray-800">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white shadow-lg rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹40</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total + 40}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                  isCheckingOut 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700'
                } transition duration-300 shadow-lg hover:shadow-xl flex justify-center items-center`}
              >
                {isCheckingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>
              <button
                onClick={() => navigate('/menu')}
                className="w-full mt-4 py-3 px-4 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 transition duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

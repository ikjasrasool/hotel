import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  const menuItems = [
    { id: 1, name: 'Veg Meals', price: 120, image: '/api/placeholder/150/150', category: 'veg', prepTime: '5 min' },
    { id: 2, name: 'Chicken Biryani', price: 180, image: '/api/placeholder/150/150', category: 'non-veg', prepTime: '8 min' },
    { id: 3, name: 'Masala Dosa', price: 80, image: '/api/placeholder/150/150', category: 'veg', prepTime: '3 min' },
    { id: 4, name: 'Paneer Butter Masala', price: 160, image: '/api/placeholder/150/150', category: 'veg', prepTime: '7 min' },
    { id: 5, name: 'Fish Curry', price: 200, image: '/api/placeholder/150/150', category: 'non-veg', prepTime: '8 min' },
    { id: 6, name: 'Parotta', price: 40, image: '/api/placeholder/150/150', category: 'veg', prepTime: '4 min' }
  ];

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
      ));
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
  };

  const removeFromCart = (id) => {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? {...item, quantity: item.quantity - 1} : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderCode(randomCode);
    setOrderPlaced(true);
  };

  const renderHome = () => (
    <div className="p-4">
      <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8">
        <img src="/api/placeholder/800/300" alt="Highway Restaurant" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
          <h1 className="text-4xl font-bold mb-2">RoadEats</h1>
          <p className="text-xl mb-4">Pre-order your food for quick pickup during bus breaks</p>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold"
            onClick={() => setActiveTab('menu')}
          >
            Order Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-red-600">Save Time</h3>
          <p>Pre-order your food before your bus arrives so it's ready when you get here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-red-600">Skip Lines</h3>
          <p>No waiting in queue. Simply collect your pre-paid order from our pickup counter.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-red-600">Guaranteed Service</h3>
          <p>Your food is prepared in advance to ensure you get back to your bus on time.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">1</div>
            <p>Browse menu & place order</p>
          </div>
          <div className="text-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">2</div>
            <p>Pay securely online</p>
          </div>
          <div className="text-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">3</div>
            <p>Receive order code</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">4</div>
            <p>Collect your order when you arrive</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Featured Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.slice(0, 3).map(item => (
            <div key={item.id} className="border rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                <button
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm"
                  onClick={() => addToCart(item)}
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMenu = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Our Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {menuItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${item.category === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {item.category === 'veg' ? 'Veg' : 'Non-Veg'}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-2">Prep time: {item.prepTime}</p>
              <div className="flex justify-between items-center">
                <p className="font-bold">₹{item.price}</p>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm"
                  onClick={() => addToCart(item)}
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <img src="/api/placeholder/800/300" alt="Restaurant" className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Welcome to RoadEats Highway Restaurant</h2>
          <p className="mb-4">
            We understand the challenges faced by bus travelers during short food breaks. With just 10-15 minutes to spare,
            getting food quickly becomes a stressful race against time.
          </p>
          <p className="mb-4">
            That's why we created RoadEats - a revolutionary pre-ordering system that allows you to browse our menu,
            place your order, and pay online before your bus even arrives at our location.
          </p>
          <p>
            When your bus stops at our restaurant, simply show your order code, collect your freshly prepared food,
            and enjoy your meal without the rush or worry of missing your bus.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-3">Our Location</h3>
          <p className="mb-2">NH-44 Highway, Salem-Coimbatore Road</p>
          <p className="mb-2">Landmark: 45km from Salem</p>
          <p>Open 24/7 for highway travelers</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-3">Contact Us</h3>
          <p className="mb-2">Phone: +91 98765 43210</p>
          <p className="mb-2">Email: info@roadeats.com</p>
          <p>For bulk orders or special requests, please contact us in advance</p>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Get In Touch</h2>
          <p className="mb-4">Have questions or suggestions? We'd love to hear from you!</p>

          <div className="mb-3">
            <p className="font-bold mb-1">Phone:</p>
            <p>+91 98765 43210</p>
          </div>

          <div className="mb-3">
            <p className="font-bold mb-1">Email:</p>
            <p>info@roadeats.com</p>
          </div>

          <div className="mb-3">
            <p className="font-bold mb-1">Address:</p>
            <p>NH-44 Highway, Salem-Coimbatore Road</p>
            <p>Landmark: 45km from Salem</p>
          </div>

          <div>
            <p className="font-bold mb-1">Hours:</p>
            <p>Open 24/7 for highway travelers</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Send a Message</h2>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Your Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your Email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                placeholder="Your Message"
                rows="4"
              ></textarea>
            </div>

            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">For Bus Operators</h2>
        <p className="mb-4">
          Are you a bus operator interested in partnering with us for your regular routes?
          We offer special arrangements for bus operators to ensure a smooth experience for your passengers.
        </p>
        <p className="mb-4">
          Benefits include:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Reserved parking area for your buses</li>
          <li>Priority food preparation for your passengers</li>
          <li>Special discounts for regular routes</li>
          <li>Custom menu options based on your passengers' preferences</li>
        </ul>
        <p>Contact our partnership team at partnerships@roadeats.com to learn more.</p>
      </div>
    </div>
  );

  const renderCart = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowCart(false)}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-screen overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Order</h2>
          <button className="text-gray-600" onClick={() => setShowCart(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <p className="text-center py-4">Your cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center py-3 border-b">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600 text-sm">₹{item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="w-8 h-8 bg-gray-200 rounded-full"
                    onClick={() => removeFromCart(item.id)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="w-8 h-8 bg-gray-200 rounded-full"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold">₹{getTotalPrice()}</span>
              </div>

              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold"
                onClick={placeOrder}
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderOrderConfirmation = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-green-600 text-4xl">✓</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="mb-4">Your order has been placed successfully.</p>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-sm mb-2">Your Order Code</p>
          <p className="text-2xl font-bold">{orderCode}</p>
        </div>

        <p className="text-sm mb-4">
          Show this code at our pickup counter when your bus arrives at our restaurant.
        </p>

        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold"
          onClick={() => {
            setOrderPlaced(false);
            setCart([]);
            setShowCart(false);
          }}
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-600">Road<span className="text-orange-500">Eats</span></h1>
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

            <button
              className="flex items-center text-white bg-red-600 px-4 py-2 rounded-full"
              onClick={() => setShowCart(true)}
            >
              <span className="mr-2">Cart</span>
              <span className="bg-white text-red-600 w-6 h-6 rounded-full flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
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

      {/* Main Content */}
      <main className="container mx-auto pb-20">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'menu' && renderMenu()}
        {activeTab === 'about' && renderAbout()}
        {activeTab === 'contact' && renderContact()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">Road<span className="text-orange-400">Eats</span></h3>
              <p className="text-gray-300">
                Your highway food stop solution for bus travelers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => setActiveTab('home')}>Home</button></li>
                <li><button onClick={() => setActiveTab('menu')}>Menu</button></li>
                <li><button onClick={() => setActiveTab('about')}>About Us</button></li>
                <li><button onClick={() => setActiveTab('contact')}>Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Contact</h3>
              <p className="text-gray-300">NH-44 Highway, Salem-Coimbatore Road</p>
              <p className="text-gray-300">Phone: +91 98765 43210</p>
              <p className="text-gray-300">Email: info@roadeats.com</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 RoadEats. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      {showCart && renderCart()}

      {/* Order Confirmation Modal */}
      {orderPlaced && renderOrderConfirmation()}
    </div>
  );
};

export default App;
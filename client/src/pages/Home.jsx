import React from 'react';

const Home = ({ setActiveTab }) => {
  return (
    <div className="p-4">
      <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
          <h1 className="text-4xl font-bold mb-2">Saravana Bhavan</h1>
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
        <p>Check out our menu for our delicious South Indian cuisine options.</p>
        <button
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold"
          onClick={() => setActiveTab('menu')}
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/food-items');
      setFoodItems(res.data);

      // Set the first category as active by default
      if (res.data.length > 0) {
        const categories = [...new Set(res.data.map(item => item.category))];
        setActiveCategory(categories[0]);
      }

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
      setError("Failed to load menu items. Please try again later.");
      setLoading(false);
    }
  };

  const groupedByCategory = foodItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Filter items based on search query
  const filteredItems = searchQuery.trim() === ''
    ? groupedByCategory
    : Object.keys(groupedByCategory).reduce((acc, category) => {
        const filtered = groupedByCategory[category].filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        if (filtered.length > 0) {
          acc[category] = filtered;
        }
        return acc;
      }, {});

  // Check if item is in cart
  const isItemInCart = (itemId) => {
    return cartItems.some(item => item._id === itemId || item.id === itemId);
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // Scroll to the category section
    document.getElementById(`category-${category.replace(/\s+/g, '-').toLowerCase()}`).scrollIntoView({
      behavior: 'smooth'
    });
  };

  // Get all unique categories
  const categories = Object.keys(groupedByCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Banner */}
      <div className="bg-red-700 text-white py-12 mb-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-center mb-4">Saravana Bhavan</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">Experience authentic South Indian cuisine crafted with traditional recipes and the finest ingredients</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Search our menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-red-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Today's Special */}
        <div className="mb-10 bg-red-50 border border-red-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Today's Special</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.filter(item => item.isPopular).slice(0, 3).map((item) => (
              <div
                key={`special-${item._id || item.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-red-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src={item.image || "https://via.placeholder.com/400x320?text=Delicious+Food"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x320?text=Delicious+Food";
                    }}
                  />
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 m-2 rounded-full">
                    Special
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                    <span className="font-bold text-red-600 text-lg">₹{item.price}</span>
                  </div>
                  {item.description && (
                    <p className="text-gray-600 mb-4 text-sm flex-grow">{item.description}</p>
                  )}
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-sm text-gray-500">Prep Time: {item.preparationTime} min</span>
                    <button
                      onClick={() => addToCart(item)}
                      className={`px-4 py-2 rounded text-sm font-medium transition ${
                        isItemInCart(item._id || item.id)
                          ? 'bg-gray-300 text-gray-700'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                      disabled={isItemInCart(item._id || item.id)}
                    >
                      {isItemInCart(item._id || item.id) ? 'Ordered' : 'Order'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Categories */}
        {Object.keys(filteredItems).length === 0 && searchQuery !== '' ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No menu items found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-red-600 hover:text-red-800"
            >
              Clear search
            </button>
          </div>
        ) : (
          Object.keys(filteredItems).map((category) => (
            <div
              key={category}
              id={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}
              className="mb-12 scroll-mt-6"
            >
              <h2 className="text-2xl font-semibold mb-6 text-red-700 border-l-4 border-red-500 pl-3">
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems[category].map((item) => (
                  <div
                    key={item._id || item.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    <div className="h-48 bg-gray-100">
                      <img
                        src={item.image || "https://via.placeholder.com/400x320?text=Delicious+Food"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400x320?text=Delicious+Food";
                        }}
                      />
                    </div>

                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                        <span className="font-bold text-red-600 text-lg">₹{item.price}</span>
                      </div>

                      {item.description && (
                        <p className="text-gray-600 mb-4 text-sm flex-grow">{item.description}</p>
                      )}

                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.isVegetarian && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Vegetarian</span>
                        )}
                        {item.isSpicy && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Spicy</span>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-sm text-gray-500">Prep Time: {item.preparationTime} min</span>
                        <button
                          onClick={() => addToCart(item)}
                          className={`px-4 py-2 rounded text-sm font-medium transition ${
                            isItemInCart(item._id || item.id)
                              ? 'bg-gray-300 text-gray-700'
                              : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                          disabled={isItemInCart(item._id || item.id)}
                        >
                          {isItemInCart(item._id || item.id) ? 'Ordered' : 'Order'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Special Dietary Information */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-4">Special Dietary Information</h2>
          <p className="text-gray-700 mb-4">
            At Saravana Bhavan, we pride ourselves on accommodating various dietary needs.
            Please inform our staff about any allergies or dietary restrictions when placing your order.
            We're happy to provide ingredient information and modify dishes when possible.
          </p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded flex items-center justify-center">Vegetarian Options</span>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded flex items-center justify-center">Vegan Options</span>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded flex items-center justify-center">Gluten-Free</span>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded flex items-center justify-center">Nut-Free</span>
          </div>
        </div>


        {/* Footer */}
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>Menu prices are subject to change. All items include applicable taxes.</p>
          <p className="mt-2">© 2025 Saravana Bhavan. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
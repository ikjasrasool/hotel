import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Additem = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    category: '',
    preparationTime: '',
    description: '',
    isVegetarian: false,
    isSpicy: false,
    accompaniments: '',
    totalSold: 0,
    lastSoldReset: new Date().toISOString().split('T')[0],
    quantity: 0
  });

  // Today's sales data state
  const [showSalesReport, setShowSalesReport] = useState(false);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchFoodItems();
    checkAndResetSales();
    simulateSalesData();
  }, []);

  const simulateSalesData = () => {
    const mockSalesData = [
      { date: new Date().toISOString().split('T')[0], totalSales: 125, topSellingItems: [] }
    ];
    setSalesData(mockSalesData);
  };

  const fetchFoodItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/food-items');
      setFoodItems(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch items:", err);
      setError("Failed to load menu items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const checkAndResetSales = async () => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const res = await axios.get('http://localhost:5000/api/food-items');
      const items = res.data;

      for (const item of items) {
        if (item.lastSoldReset !== today) {
          await axios.put(`http://localhost:5000/api/update-food/${item._id}`, {
            ...item,
            totalSold: 0,
            lastSoldReset: today
          });
        }
      }
    } catch (err) {
      console.error("Failed to reset sales:", err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const today = new Date().toISOString().split('T')[0];
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity) || 0,
        preparationTime: formData.preparationTime,
        totalSold: 0, // Always start with 0 for new items
        lastSoldReset: today
      };

      if (editingItem) {
        payload.totalSold = editingItem.totalSold;
        payload.lastSoldReset = editingItem.lastSoldReset;
        await axios.put(`http://localhost:5000/api/update-food/${editingItem._id}`, payload);
      } else {
        await axios.post('http://localhost:5000/api/add-food', payload);
      }

      await fetchFoodItems();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error("Failed to submit:", err);
      setError(editingItem ? "Failed to update item" : "Failed to add new item");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: '',
      price: '',
      category: '',
      preparationTime: '',
      description: '',
      isVegetarian: false,
      isSpicy: false,
      accompaniments: '',
      totalSold: 0,
      lastSoldReset: new Date().toISOString().split('T')[0],
      quantity: 0
    });
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/delete-food/${id}`);
      await fetchFoodItems();
    } catch (err) {
      console.error("Failed to delete item:", err);
      setError("Failed to delete the item");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      image: item.image,
      price: item.price,
      category: item.category,
      preparationTime: item.preparationTime || '15-20 mins',
      description: item.description || '',
      isVegetarian: item.isVegetarian || false,
      isSpicy: item.isSpicy || false,
      accompaniments: item.accompaniments || '',
      totalSold: item.totalSold || 0,
      lastSoldReset: item.lastSoldReset || new Date().toISOString().split('T')[0],
      quantity: item.quantity || 0
    });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleIncreaseSales = async (item) => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const newTotalSold = item.lastSoldReset !== today ? 1 : (item.totalSold || 0) + 1;

      const updatedItem = {
        ...item,
        totalSold: newTotalSold,
        lastSoldReset: today
      };

      await axios.put(`http://localhost:5000/api/update-food/${item._id}`, updatedItem);
      await fetchFoodItems();
    } catch (err) {
      console.error("Failed to update sales count:", err);
      setError("Failed to update sales count");
    }
  };

  const filterItems = () => {
    let filtered = [...foodItems];

    if (filter !== 'all') {
      filtered = filtered.filter(item => item.category === filter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const groupedItems = filterItems().reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = [...new Set(foodItems.map(item => item.category))];

  const topSellingItems = [...foodItems]
      .sort((a, b) => (b.totalSold || 0) - (a.totalSold || 0))
      .slice(0, 5);

  // Create a Set of top-selling item IDs for efficient lookup
  const topSellingItemIds = new Set(topSellingItems.map(item => item._id));

  const getEnhancedNameWithPopularTag = (item, isPopular) => {
    let name = item.name;
    return name;
  };

  const getEnhancedName = (item) => {
    const isPopular = topSellingItemIds.has(item._id);
    return getEnhancedNameWithPopularTag(item, isPopular);
  };

  return (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <header className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="text-3xl font-bold text-red-700 mb-4 md:mb-0">
                Saravana Bhavan <span className="text-gray-600 text-xl">Admin Panel</span>
              </h1>
              <div className="flex gap-2">
                <button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors duration-200 flex items-center"
                    onClick={() => {
                      setShowForm(true);
                      resetForm();
                    }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Food Item
                </button>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200 flex items-center"
                    onClick={() => setShowSalesReport(!showSalesReport)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 6a1 1 0 000 2h14a1 1 0 100-2H3zm0 6a1 1 0 100 2h14a1 1 0 100-2H3z" clipRule="evenodd" />
                  </svg>
                  {showSalesReport ? 'Hide Sales' : 'Show Sales'}
                </button>
                <button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors duration-200"
                    onClick={fetchFoodItems}
                >
                  Refresh
                </button>
              </div>
            </div>
          </header>

          {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
                <p>{error}</p>
              </div>
          )}

          {showSalesReport && (
              <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-l-4 border-blue-500">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Today's Top Selling Items</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Sold</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {topSellingItems.map((item, index) => (
                        <tr key={item._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getEnhancedNameWithPopularTag(item, true)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{item.totalSold || 0}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                                onClick={() => handleIncreaseSales(item)}
                                className="text-green-600 hover:text-green-900 mr-3"
                            >
                              + Sale
                            </button>
                            <button
                                onClick={() => handleEdit(item)}
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                  Total sales today: {foodItems.reduce((total, item) => total + (item.totalSold || 0), 0)} items
                </div>
              </div>
          )}

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
              <div className="flex-1 md:mr-4">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Menu Items</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                      type="text"
                      id="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      placeholder="Search by name or category"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-72">
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
                <select
                    id="category-filter"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
                </div>
            ) : Object.keys(groupedItems).length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No items found. Try changing your filters or add new items.</p>
                </div>
            ) : (
                Object.keys(groupedItems).map((category) => (
                    <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-200">
                      <div className="bg-red-700 text-white p-3">
                        <h2 className="text-xl font-bold">{category}</h2>
                      </div>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedItems[category].map((item) => (
                            <div key={item._id} className="bg-gray-50 border rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
                              <div className="relative h-48">
                                <img
                                    src={item.image}
                                    alt={getEnhancedName(item)}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available'}}
                                />
                                {(item.totalSold > 0) && (
                                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                              Sold: {item.totalSold}
                            </span>
                                )}
                              </div>
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                                  <p className="text-lg font-semibold text-red-700">₹{item.price}</p>
                                </div>

                                {item.description && (
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                                )}

                                <div className="flex flex-wrap gap-2 mb-3">
                                  {item.isVegetarian && (
                                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vegetarian</span>
                                  )}
                                  {item.isSpicy && (
                                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Spicy</span>
                                  )}
                                  {topSellingItemIds.has(item._id) && (
                                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Popular</span>
                                  )}
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {item.preparationTime || "15-20 mins"}
                            </span>
                                </div>

                                {item.accompaniments && (
                                    <p className="text-gray-700 text-xs mb-3">
                                      <span className="font-medium">Includes:</span> {item.accompaniments}
                                    </p>
                                )}

                                <div className="flex gap-2 mt-2">
                                  <button
                                      onClick={() => handleIncreaseSales(item)}
                                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded transition-colors duration-200 flex items-center justify-center"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                    </svg>
                                    Sale
                                  </button>
                                  <button
                                      onClick={() => handleEdit(item)}
                                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded transition-colors duration-200 flex items-center justify-center"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Edit
                                  </button>
                                  <button
                                      onClick={() => handleDelete(item._id)}
                                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition-colors duration-200 flex items-center justify-center"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                ))
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-300 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-yellow-800">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Special Dietary Requirements</h3>
                <p className="text-gray-600">Please inform our staff about any allergies or dietary restrictions when placing your order. We can modify many dishes to accommodate special requirements.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Reservations</h3>
                <p className="text-gray-600">For large groups or special events, we recommend making a reservation at least 24 hours in advance. Contact us at <a href="tel:+911234567890" className="text-red-700 hover:underline">+91 123 456 7890</a>.</p>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm py-4">
            &copy; {new Date().getFullYear()} Saravana Bhavan. All rights reserved.
          </div>
        </div>

        {showForm && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h2 className="text-xl font-bold text-gray-800">{editingItem ? 'Update Food Item' : 'Add New Food Item'}</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setShowForm(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Food Name*</label>
                      <input
                          type="text"
                          name="name"
                          placeholder="e.g., Masala Dosa"
                          value={formData.name}
                          onChange={handleChange}
                          className="border p-2 w-full rounded focus:ring-red-500 focus:border-red-500"
                          required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL*</label>
                      <input
                          type="text"
                          name="image"
                          placeholder="https://example.com/image.jpg"
                          value={formData.image}
                          onChange={handleChange}
                          className="border p-2 w-full rounded focus:ring-red-500 focus:border-red-500"
                          required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)*</label>
                      <input
                          type="number"
                          name="price"
                          placeholder="e.g., 120"
                          value={formData.price}
                          onChange={handleChange}
                          className="border p-2 w-full rounded focus:ring-red-500 focus:border-red-500"
                          min="0"
                          step="0.01"
                          required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                      <input
                          type="text"
                          name="category"
                          placeholder="e.g., South Indian Specials"
                          value={formData.category}
                          onChange={handleChange}
                          className="border p-2 w-full rounded focus:ring-red-500 focus:border-red-500"
                          required
                          list="categories"
                      />
                      <datalist id="categories">
                        {categories.map(cat => (
                            <option key={cat} value={cat} />
                        ))}
                      </datalist>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time*</label>
                      <input
                          type="text"
                          name="preparationTime"
                          placeholder="e.g., 15-20 mins"
                          value={formData.preparationTime}
                          onChange={handleChange}
                          className="border p-2 w-full rounded focus:ring-red-500 focus:border-red-500"
                          required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
                      <input
                          type="number"
                          name="quantity"
                          placeholder="e.g., 50"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="border p-2 w-full rounded focus:ring-red-500 focus:border-red-500"
                          min="0"
                          required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        placeholder="Brief description of the dish"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 w-full rounded focus:ring-red-500 focus:border-red-500 h-24"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Accompaniments</label>
                    <input
                        type="text"
                        name="accompaniments"
                        placeholder="e.g., Sambar, Coconut Chutney, Tomato Chutney"
                        value={formData.accompaniments}
                        onChange={handleChange}
                        className="border p-2 w-full rounded focus:ring-red-500 focus:border-red-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">List items that come with this dish, like chutneys, sambar, etc.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <input
                          type="checkbox"
                          id="isVegetarian"
                          name="isVegetarian"
                          checked={formData.isVegetarian}
                          onChange={handleChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isVegetarian" className="ml-2 block text-sm text-gray-700">
                        Vegetarian
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                          type="checkbox"
                          id="isSpicy"
                          name="isSpicy"
                          checked={formData.isSpicy}
                          onChange={handleChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isSpicy" className="ml-2 block text-sm text-gray-700">
                        Spicy
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 border-t pt-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-200"
                        onClick={() => {
                          setShowForm(false);
                          resetForm();
                        }}
                    >
                      Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200 flex items-center"
                        disabled={loading}
                    >
                      {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                      ) : (
                          <>{editingItem ? 'Update Item' : 'Add Item'}</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
};

export default Additem;


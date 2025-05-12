import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  RefreshCw, Clock, Package, User, Mail, Calendar, Bus, FileText, Search, CheckCircle,
  BarChart2, TrendingUp, ArrowRight, Calendar as CalendarIcon, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Separate states for analytics data that shouldn't be affected by deletions
  const [allOrders, setAllOrders] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);
  const [historicalStats, setHistoricalStats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('daily'); // 'daily' or 'weekly'

  useEffect(() => {
    fetchOrders();
    fetchDailyStats();
    // Setup daily reset timer
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight - now;
    
    const midnightTimer = setTimeout(() => {
      resetDailyStats();
      // Setup recurring timer for subsequent days
      const dailyTimer = setInterval(resetDailyStats, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyTimer);
    }, timeUntilMidnight);
    
    return () => clearTimeout(midnightTimer);
  }, []);

  // Fetch today's orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://hotel-g86y.onrender.com/api/orders/all');
      if (res.data.success) {
        setOrders(res.data.orders);
        
        // For analytics, maintain a complete record of all orders including deleted ones
        setAllOrders(prev => {
          // Merge existing orders with new ones, avoiding duplicates
          const existingOrderCodes = prev.map(order => order.orderCode);
          const newOrders = res.data.orders.filter(order => !existingOrderCodes.includes(order.orderCode));
          return [...prev, ...newOrders];
        });
      } else {
        setError("Failed to fetch orders. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Could not connect to server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch daily statistics
  const fetchDailyStats = async () => {
    try {
      // This would ideally come from an API endpoint that provides historical data
      // For now, we'll simulate with mock data
      const mockHistoricalData = generateMockHistoricalData();
      setHistoricalStats(mockHistoricalData);
      
      // Set today's stats based on the mock data or from a separate API call
      const today = new Date().toISOString().split('T')[0];
      const todayStats = mockHistoricalData.find(day => day.date === today) || {
        date: today,
        orders: 0,
        revenue: 0
      };
      setDailyStats([todayStats]);
    } catch (err) {
      console.error("Error fetching statistics:", err);
    }
  };

  // Generate mock historical data for demonstration
  const generateMockHistoricalData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      // Generate random but realistic data
      const orderCount = Math.floor(Math.random() * 50) + 10;
      const revenue = (Math.random() * 10000) + 5000;
      
      data.push({
        date: dateString,
        orders: orderCount,
        revenue: revenue
      });
    }
    
    return data;
  };

  // Reset daily stats at midnight
  const resetDailyStats = () => {
    // In a real app, you would call an API to reset or start a new day
    // Here we'll just update our local state
    const today = new Date().toISOString().split('T')[0];
    
    // Add yesterday's stats to historical data
    setHistoricalStats(prev => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];
      
      // Check if yesterday's data already exists
      if (!prev.some(day => day.date === yesterdayString)) {
        const yesterdayOrders = allOrders.filter(order => {
          const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
          return orderDate === yesterdayString;
        });
        
        const revenue = yesterdayOrders.reduce((total, order) => total + order.totalAmount, 0);
        
        return [...prev, {
          date: yesterdayString,
          orders: yesterdayOrders.length,
          revenue: revenue
        }];
      }
      return prev;
    });
    
    // Set up new day's stats
    setDailyStats([{
      date: today,
      orders: 0,
      revenue: 0
    }]);
  };

  const handleDelete = async (orderCode) => {
    if (!window.confirm('Are you sure you want to mark this order as delivered?')) return;

    setLoading(true);
    try {
      const response = await axios.delete(`https://hotel-g86y.onrender.com/api/orders/delete/${orderCode}`);

      if (response.data.success) {
        // Only remove from orders (display), not from allOrders (analytics)
        setOrders(orders.filter(order => order.orderCode !== orderCode));

        // Mark as completed in allOrders instead of removing
        setAllOrders(allOrders.map(order =>
          order.orderCode === orderCode
            ? { ...order, status: 'completed' }
            : order
        ));

        setError(null);
      } else {
        setError("Failed to mark order as delivered. Please try again.");
      }
    } catch (error) {
      console.error('Error updating order:', error);
      setError("Could not update the order. Server error.");
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderDetails = (orderCode) => {
    if (expandedOrder === orderCode) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderCode);
    }
  };

  // Filter functionality
  const filterOrders = () => {
    let filtered = [...orders];

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(order => order.status === filter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order =>
        order.orderCode.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query) ||
        order.busNumber.toString().includes(query)
      );
    }

    return filtered;
  };

  // Calculate statistics for today only
  const calculateTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];

    const todayOrders = allOrders.filter(order => {
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
      return orderDate === today;
    });

    const totalRevenue = todayOrders.reduce((total, order) => total + order.totalAmount, 0);
    const totalOrderCount = todayOrders.length;
    const avgOrderValue = totalOrderCount > 0 ? totalRevenue / totalOrderCount : 0;

    return {
      totalRevenue,
      totalOrderCount,
      avgOrderValue
    };
  };

  const todayStats = calculateTodayStats();

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Format date for display
  const formatDisplayDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-IN', options);
  };

  // Navigate between dates
  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'daily') {
      newDate.setDate(selectedDate.getDate() + direction);
    } else {
      newDate.setDate(selectedDate.getDate() + (direction * 7));
    }
    setSelectedDate(newDate);
  };

  // Get chart data based on selected date and view mode
  const getChartData = () => {
    if (viewMode === 'daily') {
      // Get data for the selected date
      const dateString = selectedDate.toISOString().split('T')[0];
      const dayData = historicalStats.find(day => day.date === dateString);
      return dayData ? [dayData] : [];
    } else {
      // Get data for the selected week
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return historicalStats.filter(day => {
        const dayDate = new Date(day.date);
        return dayDate >= startOfWeek && dayDate <= endOfWeek;
      });
    }
  };

  const chartData = getChartData();
  const filteredOrders = filterOrders();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-red-700 mb-4 md:mb-0">
              Saravana Bhavan <span className="text-gray-600 text-xl">Order Management</span>
            </h1>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200 flex items-center"
              onClick={fetchOrders}
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Refresh Orders
            </button>
          </div>
        </header>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
            <p>{error}</p>
          </div>
        )}

        {/* Today's Dashboard Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-red-600" />
            Today's Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <Package className="h-5 w-5 mr-2 text-blue-500" />
                Total Orders Today
              </h3>
              <p className="text-3xl font-bold text-blue-600">{todayStats.totalOrderCount}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                Today's Revenue
              </h3>
              <p className="text-3xl font-bold text-green-600">₹{todayStats.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-purple-500" />
                Avg. Order Value
              </h3>
              <p className="text-3xl font-bold text-purple-600">
                ₹{todayStats.avgOrderValue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>


  {/*Historical Data Charts*/}
  {/*<div className="bg-white rounded-lg shadow-md p-6 mb-6">*/}
  {/*  <div className="flex flex-col md:flex-row justify-between items-center mb-6">*/}
  {/*    <h2 className="text-xl font-bold text-gray-800 flex items-center">*/}
  {/*      <BarChart2 className="h-5 w-5 mr-2 text-red-600" />*/}
  {/*      Sales Analytics*/}
  {/*    </h2>*/}
  {/*    <div className="flex items-center mt-4 md:mt-0">*/}
  {/*      <button*/}
  {/*        onClick={() => navigateDate(-1)}*/}
  {/*        className="p-2 rounded hover:bg-gray-100"*/}
  {/*      >*/}
  {/*        <ChevronsLeft className="h-5 w-5 text-gray-600" />*/}
  {/*      </button>*/}
  {/*      <div className="mx-2 text-gray-800 font-medium">*/}
  {/*        {viewMode === 'daily'*/}
  {/*          ? formatDisplayDate(selectedDate)*/}
  {/*          : `Week of ${formatDisplayDate(selectedDate)}`*/}
  {/*        }*/}
  {/*      </div>*/}
  {/*      <button*/}
  {/*        onClick={() => navigateDate(1)}*/}
  {/*        className="p-2 rounded hover:bg-gray-100"*/}
  {/*      >*/}
  {/*        <ChevronsRight className="h-5 w-5 text-gray-600" />*/}
  {/*      </button>*/}
  {/*      <select*/}
  {/*        className="ml-4 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"*/}
  {/*        value={viewMode}*/}
  {/*        onChange={(e) => setViewMode(e.target.value)}*/}
  {/*      >*/}
  {/*        <option value="daily">Daily View</option>*/}
  {/*        <option value="weekly">Weekly View</option>*/}
  {/*      </select>*/}
  {/*    </div>*/}
  {/*  </div>*/}

  {/*  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">*/}
  {/*     Revenue Chart */}
  {/*    <div className="bg-white rounded-lg p-4 border border-gray-200">*/}
  {/*      <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue</h3>*/}
  {/*      <div className="h-64">*/}
  {/*        <ResponsiveContainer width="100%" height="100%">*/}
  {/*          <LineChart*/}
  {/*            data={chartData}*/}
  {/*            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}*/}
  {/*          >*/}
  {/*            <CartesianGrid strokeDasharray="3 3" />*/}
  {/*            <XAxis dataKey="date" />*/}
  {/*            <YAxis />*/}
  {/*            <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />*/}
  {/*            <Legend />*/}
  {/*            <Line*/}
  {/*              type="monotone"*/}
  {/*              dataKey="revenue"*/}
  {/*              stroke="#10B981"*/}
  {/*              activeDot={{ r: 8 }}*/}
  {/*              name="Revenue (₹)"*/}
  {/*            />*/}
  {/*          </LineChart>*/}
  {/*        </ResponsiveContainer>*/}
  {/*      </div>*/}
  {/*    </div>*/}

  {/*    /!* Orders Count Chart *!/*/}
  {/*     <div className="bg-white rounded-lg p-4 border border-gray-200">*/}
  {/*      <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Count</h3>*/}
  {/*      <div className="h-64">*/}
  {/*        <ResponsiveContainer width="100%" height="100%">*/}
  {/*          <BarChart*/}
  {/*            data={chartData}*/}
  {/*            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}*/}
  {/*          >*/}
  {/*            <CartesianGrid strokeDasharray="3 3" />*/}
  {/*            <XAxis dataKey="date" />*/}
  {/*            <YAxis />*/}
  {/*            <Tooltip />*/}
  {/*            <Legend />*/}
  {/*            <Bar dataKey="orders" fill="#3B82F6" name="Orders" />*/}
  {/*          </BarChart>*/}
  {/*        </ResponsiveContainer>*/}
  {/*      </div>*/}
  {/*    </div>*/}
  {/*  </div>*/}
  {/*</div>*/}



        {/* Search and Filter Controls */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
            <div className="flex-1 md:mr-4">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Orders</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Search by order code, customer name, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

          </div>

          {/* Orders List */}
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No orders found. Try changing your filters or refreshing the page.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.orderCode} className="bg-white border rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
                  <div className="flex flex-col md:flex-row">
                    {/* Left side - Order details */}
                    <div className="flex-1 p-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="bg-red-100 text-red-800 font-bold px-3 py-1 rounded-full text-sm">
                              #{order.orderCode}
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-gray-800 font-medium">{order.customerName}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-gray-600 text-sm">{formatDate(order.createdAt)}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-gray-600 text-sm">{order.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-gray-600 text-sm">Age: {order.age}</span>
                          </div>
                          <div className="flex items-center">
                            <Bus className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-gray-600 text-sm">Bus: {order.busNumber}</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-gray-700 font-semibold">₹{order.totalAmount.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                          <button
                            onClick={() => toggleOrderDetails(order.orderCode)}
                            className="flex items-center text-blue-500 hover:text-blue-600"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            <span className="text-sm">
                              {expandedOrder === order.orderCode ? 'Hide Details' : 'View Details'} ({order.items.length} items)
                            </span>
                          </button>

                          <button
                            onClick={() => handleDelete(order.orderCode)}
                            className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-full transition duration-200 flex items-center font-medium shadow-sm hover:shadow"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Delivered
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Order items preview */}
                    <div className="w-full md:w-64 bg-gray-50 p-4 border-t md:border-t-0 md:border-l">
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-700 mb-2">Order Items</h4>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center text-red-500 mr-4 flex-shrink-0">
                                <span className="font-bold">{item.name.charAt(0)}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                <p className="text-xs text-gray-500">x{item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {order.items.length > 3 && (
                          <p className="text-xs text-gray-500 text-center">
                            +{order.items.length - 3} more items
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded order details section */}
                  {expandedOrder === order.orderCode && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4">
                      <h3 className="font-semibold text-gray-700 mb-2">Order Items</h3>
                      <div className="bg-white rounded shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Item
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subtotal
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {order.items.map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center text-red-500 mr-4 flex-shrink-0">
                                      <span className="font-bold">{item.name.charAt(0)}</span>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{item.quantity}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">₹{item.price.toFixed(2)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-semibold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50">
                            <tr>
                              <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                                Total:
                              </td>
                              <td className="px-6 py-3 text-sm font-bold text-gray-900">
                                ₹{order.totalAmount.toFixed(2)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-yellow-800">Orders Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Managing Orders</h3>
              <p className="text-gray-600">To manage customer orders, you can view the details of each order and mark them as delivered when completed. Statistics are tracked separately for accurate daily and historical reporting.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Daily Reset</h3>
              <p className="text-gray-600">Daily statistics are automatically reset at midnight. Previous day's data is stored in the analytics section for historical tracking and reporting purposes.</p>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm py-4">
          &copy; {new Date().getFullYear()} Saravana Bhavan. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;


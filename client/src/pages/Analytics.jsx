import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  Calendar, ChevronsLeft, ChevronsRight, BarChart2,
  TrendingUp, Package, ArrowUpRight
} from 'lucide-react';

const Analytics = () => {
  const [viewMode, setViewMode] = useState('daily'); // 'daily', 'weekly', 'monthly'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [orderData, setOrderData] = useState([]);
  const [productStats, setProductStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderData();
  }, [viewMode, selectedDate]);

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://hotel-g86y.onrender.com/api/orders/all');
      if (response.data.success) {
        processOrderData(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processOrderData = (orders) => {
    // Process orders based on view mode
    const processedData = aggregateOrdersByDate(orders);
    setOrderData(processedData);

    // Process product statistics
    const productData = aggregateProductStats(orders);
    setProductStats(productData);
  };

  const aggregateOrdersByDate = (orders) => {
    const groupedOrders = {};

    orders.forEach(order => {
      const date = new Date(order.createdAt);
      let key;

      switch(viewMode) {
        case 'daily':
          key = date.toISOString().split('T')[0];
          break;
        case 'weekly':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split('T')[0];
          break;
        case 'monthly':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
      }

      if (!groupedOrders[key]) {
        groupedOrders[key] = {
          date: key,
          orders: 0,
          revenue: 0
        };
      }

      groupedOrders[key].orders++;
      groupedOrders[key].revenue += order.totalAmount;
    });

    return Object.values(groupedOrders).sort((a, b) => a.date.localeCompare(b.date));
  };

  const aggregateProductStats = (orders) => {
    const productStats = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        if (!productStats[item.name]) {
          productStats[item.name] = {
            name: item.name,
            quantity: 0,
            revenue: 0
          };
        }
        productStats[item.name].quantity += item.quantity;
        productStats[item.name].revenue += item.price * item.quantity;
      });
    });

    return Object.values(productStats)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10); // Top 10 products
  };

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    switch(viewMode) {
      case 'daily':
        newDate.setDate(selectedDate.getDate() + direction);
        break;
      case 'weekly':
        newDate.setDate(selectedDate.getDate() + (direction * 7));
        break;
      case 'monthly':
        newDate.setMonth(selectedDate.getMonth() + direction);
        break;
    }
    setSelectedDate(newDate);
  };

  const formatDate = () => {
    switch(viewMode) {
      case 'daily':
        return selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      case 'weekly':
        const weekStart = new Date(selectedDate);
        weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      case 'monthly':
        return selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Order Analytics</h1>
            <div className="flex items-center space-x-4">
              <select
                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateDate(-1)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <ChevronsLeft className="h-5 w-5" />
                </button>
                <span className="font-medium">{formatDate()}</span>
                <button
                  onClick={() => navigateDate(1)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <ChevronsRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Orders Over Time Chart */}
              <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300">
                <div className="flex items-center mb-4 space-x-2">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-semibold">Orders Over Time</h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={orderData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                      <XAxis dataKey="date" stroke="#4B5563" />
                      <YAxis stroke="#4B5563" />
                      <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                      <Legend wrapperStyle={{ paddingTop: '1rem' }} />
                      <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} dot={{ strokeWidth: 2 }} name="Number of Orders" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300">
                <div className="flex items-center mb-4 space-x-2">
                  <BarChart2 className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold">Revenue Analysis</h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={orderData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                      <XAxis dataKey="date" stroke="#4B5563" />
                      <YAxis stroke="#4B5563" />
                      <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                      <Legend wrapperStyle={{ paddingTop: '1rem' }} />
                      <Bar dataKey="revenue" fill="#82ca9d" name="Revenue (₹)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Popular Products Chart */}
              <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 lg:col-span-2">
                <div className="flex items-center mb-4 space-x-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Top Products by Orders</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productStats}
                          dataKey="quantity"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {productStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={productStats}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#8884d8" name="Revenue (₹)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

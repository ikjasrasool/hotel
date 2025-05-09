const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Razorpay = require('razorpay');
require('dotenv').config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Function to generate unique order code
function generateOrderCode() {
  return 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Route to create an order and initiate payment
router.post('/create', async (req, res) => {
  try {
    // Destructure data from request body
    const {
      customerName,
      email,
      age,
      busNumber,
      items,
      totalAmount
    } = req.body;

    // Check if essential fields are provided
    if (!customerName || !email || !totalAmount || !items || !busNumber) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const orderCode = generateOrderCode();

    // Create the order in the database
    const order = new Order({
      orderCode,
      customerName,
      email,
      age,
      busNumber,
      items,
      totalAmount
    });

    // Save the order in the database
    await order.save();

    // Create Razorpay order
    const options = {
      amount: totalAmount * 100, // Convert to paisa (Razorpay works with paisa)
      currency: 'INR',
      receipt: orderCode,
      payment_capture: 1, // Automatically capture payment
    };

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create(options);

    // Respond with both the order details and Razorpay order details
    res.status(201).json({
      success: true,
      orderCode,
      order,
      razorpayOrder
    });
  } catch (error) {
    console.error('Error:', error);
    // Return a generic error message to the client
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Latest first
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
});


router.delete('/delete/:orderCode', async (req, res) => {
  try {
    const { orderCode } = req.params;

    // Find and delete the order by orderCode
    const deletedOrder = await Order.findOneAndDelete({ orderCode });

    if (!deletedOrder) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order deleted successfully', deletedOrder });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;

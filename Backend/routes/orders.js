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

module.exports = router;

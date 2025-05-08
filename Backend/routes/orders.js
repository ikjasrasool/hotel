const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

function generateOrderCode() {
  return 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

router.post('/create', async (req, res) => {
  try {
    const {
      customerName,
      email,
      age,
      busNumber,
      items,
      totalAmount
    } = req.body;

    const orderCode = generateOrderCode();

    const order = new Order({
      orderCode,
      customerName,
      email,
      age,
      busNumber,
      items,
      totalAmount
    });

    await order.save();
    res.status(201).json({ success: true, orderCode, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

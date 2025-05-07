const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

// Verify Razorpay signature (optional)
router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Invalid signature' });
  }
});

module.exports = router;

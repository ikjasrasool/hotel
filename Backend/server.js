const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const foodRoutes = require('./routes/food');
const orderRoutes = require('./routes/orders');
const razorpayRoutes = require('./routes/Razorpay'); // 👈 Razorpay route

app.use(cors());
app.use(express.json());

app.use('/api', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', razorpayRoutes); // 👈 Register Razorpay routes

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Basic login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password }); // For demo, use hashing in real apps
    if (user) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

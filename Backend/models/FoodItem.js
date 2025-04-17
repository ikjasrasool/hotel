const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  preparationTime: {
    type: String, // Changed to String to match the format "15-20 mins"
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isSpicy: {
    type: Boolean,
    default: false
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  accompaniments: { // Added field
    type: String,
    default: ''
  },
  totalSold: { // Added field
    type: Number,
    default: 0,
    min: 0
  },
  quantity: { // Added field
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);

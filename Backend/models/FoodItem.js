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
    required: true
  },
  preparationTime: {
    type: Number,
    required: true,
    min: 1
  },
  description: {
    type: String,
    default: ''
  },
  allergens: {
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
  }
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);

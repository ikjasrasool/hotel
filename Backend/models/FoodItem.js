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
    type: String, // Changed from Number to String
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  includes: { // Changed from allergens to includes
    type: String,
    default: 'Sambar and Chutney' // Default value
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
  quantity: { // New field
    type: Number,
    required: true,
    min: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);


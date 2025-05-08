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
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  includes: {
    type: String,
    default: 'Sambar and Chutney'
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
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  ingredients: {
    type: [String],
    default: []
  },
  nutritionalInfo: {
    calories: { type: Number },
    protein: { type: Number },
    carbohydrates: { type: Number },
    fat: { type: Number }
  },
  availableTime: {
    start: { type: String },
    end: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);

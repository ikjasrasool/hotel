const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// Add a food item
router.post('/add-food', async (req, res) => {
  try {
    const food = new FoodItem(req.body);
    await food.save();
    res.status(201).json({ message: 'Food item added!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add food item', error });
  }
});

// Get all food items
router.get('/food-items', async (req, res) => {
  try {
    const items = await FoodItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch food items', error });
  }
});


//Delete food items
router.delete('/delete-food/:id', async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Food item deleted!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete food item', error });
  }
});

//update
router.put('/update-food/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await FoodItem.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Item updated", item: updated });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});


module.exports = router;

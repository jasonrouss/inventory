const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01, // set a minimum price of 0.01
  },
  buyer: {
    type: String,
  },
  itemId: {
    type: String, // adjust data type based on your ID implementation
    unique: true, // ensure unique IDs for each item
  },
});

module.exports = mongoose.model("Item", itemSchema);

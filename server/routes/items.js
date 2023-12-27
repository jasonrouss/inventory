const express = require("express");
const router = express.Router();
const Item = require("../models/item");

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single item
router.get("/:id", getItem, (req, res) => {
  res.json(res.item);
});

// Create an item
router.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    price: req.body.price,
    buyer: req.body.buyer,
    itemId: req.body.itemId, // Ensure this is a unique ID
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an item
router.patch("/:id", getItem, async (req, res) => {
  if (req.body.name != null) {
    res.item.name = req.body.name;
  }
  if (req.body.price != null) {
    res.item.price = req.body.price;
  }
  if (req.body.buyer != null) {
    res.item.buyer = req.body.buyer;
  }
  if (req.body.itemId != null) {
    res.item.itemId = req.body.itemId;
  }

  try {
    const updatedItem = await res.item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete("/:id", async (req, res) => {
  try {
    const user = await Item.findOneAndDelete({ _id: req.params.id });
    if (!user)
      return res.status(404).send({ message: "Item with given id not found" });
    res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

async function getItem(req, res, next) {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.item = item;
  next();
}

module.exports = router;

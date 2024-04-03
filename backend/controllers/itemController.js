const Item = require("../models/itemModel");

const createItem = async (req, res) => {
  try {
    const item = new Item({
      name: req.body.name,
      image: req.file ? req.file.filename : "",
      price: req.body.price,
    });
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single item
const getSingleItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    await item.remove();
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an item
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (req.body.name != null) {
      item.name = req.body.name;
    }
    if (req.file) {
      item.image = req.file.filename;
    }
    if (req.body.price != null) {
      item.price = req.body.price;
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getSingleItem,
  deleteItem,
  updateItem,
};

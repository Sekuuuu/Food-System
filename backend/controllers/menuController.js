const Menu = require("../models/menuModel");

// Get all menus for the current day
const getAllMenu = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to beginning of the day
    const menus = await Menu.find({
      createdAt: {
        $gte: today, // Get menus created on or after today
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Get menus created before tomorrow
      },
    });
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new menu
const createMenu = async (req, res) => {
  try {
    const menu = new Menu({
      category_id: req.body.category_id,
      item_id: req.body.item_id,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      quantity: req.body.quantity,
      //status: req.body.status || false,
    });
    const newMenu = await menu.save();
    res.status(201).json(newMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a menu
const deleteMenu = async (req, res) => {
  try {
    const deletedMenu = await Menu.deleteOne({ _id: req.params.id });
    if (deletedMenu.deletedCount === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.json({ message: "Menu deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit a menu
const editMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    // if (req.body.category_id != null) {
    //   menu.category_id = req.body.category_id;
    // }
    // if (req.body.item_id != null) {
    //   menu.item_id = req.body.item_id;
    // }
    if (req.body.start_time != null) {
      menu.start_time = req.body.start_time;
    }
    if (req.body.end_time != null) {
      menu.end_time = req.body.end_time;
    }
    if (req.body.quantity != null) {
      menu.quantity = req.body.quantity;
    }
    if (req.body.status != null) {
      menu.status = req.body.status;
    }

    const updatedMenu = await menu.save();
    res.json(updatedMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllMenu, createMenu, editMenu, deleteMenu };

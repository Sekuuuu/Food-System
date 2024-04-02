// controllers/orderController.js
const Order = require("../models/order");
const User = require("../models/user");
const Menu = require("../models/menu");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const menu = await Menu.findById(req.body.menu_id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    const currentTime = new Date().toLocaleTimeString();
    if (currentTime < menu.start_time || currentTime > menu.end_time) {
      return res
        .status(400)
        .json({ message: "Menu not available at this time" });
    }

    const user = await User.findById(req.body.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "Customer") {
      const totalPrice = menu.price * req.body.quantity;
      if (user.balance < totalPrice) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      user.balance -= totalPrice;
      await user.save();
    }

    const order = new Order({
      user_id: req.body.user_id,
      menu_id: req.body.menu_id,
      quantity: req.body.quantity,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// cancel an order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({
        message: "Order has already been delivered and cannot be cancelled",
      });
    }

    const user = await User.findById(order.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Refund the user's balance
    let refundAmount = 0;
    const menu = await Menu.findById(order.menu_id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    refundAmount = menu.price * order.quantity;
    user.balance += refundAmount;
    await user.save();

    // Remove the order
    await order.remove();

    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//order of single user for the day
const getOrder = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to beginning of the day
    const orders = await Order.find({
      user_id: req.params.userId, // Assuming userId is passed as a parameter
      createdAt: {
        $gte: today, // Get orders created on or after today
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Get orders created before tomorrow
      },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Change order status to "delivered"
const setOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "Delivered";
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  cancelOrder,
  getOrder,
  setOrder,
};

const express = require("express");
const Router = express.Router();
const {
  createOrder,
  getAllOrders,
  cancelOrder,
  getOrder,
  setOrder,
} = require("../controllers/orderController");

Router.post("/", createOrder);
Router.get("/", getAllOrders);
Router.get("/:id", getOrder);
Router.patch("/:id", setOrder);
Router.delete("/:id", cancelOrder);

module.exports = Router;

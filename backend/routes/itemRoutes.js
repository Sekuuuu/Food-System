const express = require("express");
const Router = express.Router();
const {
  createItem,
  getAllItems,
  getSingleItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemController");

Router.post("/", upload.single("avatar"), createItem);
Router.get("/", getAllItems);
Router.get("/:id", getSingleItem);
Router.delete("/:id", deleteItem);
Router.patch("/:id", upload.single("avatar"), updateItem);

module.exports = Router;

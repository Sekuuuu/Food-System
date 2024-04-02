const express = require("express");
const Router = express.Router();
const {
  getAllMenu,
  createMenu,
  editMenu,
  deleteMenu,
} = require("../controllers/menuController");
const { get } = require("mongoose");

Router.post("/", createMenu);
Router.get("/", getAllMenu);
Router.delete("/:id", deleteMenu);
Router.patch("/:id", editMenu);

module.exports = Router;

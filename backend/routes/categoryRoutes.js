const express = require("express");
const Router = express.Router();
const {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

Router.post("/", upload.single("avatar"), createCategory);
Router.get("/", getAllCategories);
Router.delete("/:id", deleteCategory);
Router.patch("/:id", upload.single("avatar"), updateCategory);

module.exports = Router;

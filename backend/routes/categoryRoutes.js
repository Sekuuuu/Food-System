const express = require("express");
const Router = express.Router();
const upload = require("../middleware/photoUpload");

const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

Router.post("/", createCategory);
Router.get("/", getAllCategories);
Router.get("/:id", getSingleCategory);
Router.delete("/:id", deleteCategory);
Router.patch("/:id", updateCategory);

module.exports = Router;

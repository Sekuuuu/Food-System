const { signup, login } = require("../controllers/authController");
const {
  user,
  users,
  deleteUser,
  editUser,
  editUserAdmin,
} = require("../controllers/userController");
const express = require("express");
const Router = express.Router();
const { userVerification } = require("../middleware/authMiddleware");
const upload = require("../middleware/photoUpload");

//User register and signup
Router.post("/signup", upload.single("avatar"), signup);
Router.post("/login", login);
Router.post("/", userVerification);

//get all and get one user
Router.get("/", users);
Router.get("/:id", user);

//Update & Delete
Router.delete("/:id", deleteUser);
Router.patch("/edit/:id", upload.single("avatar"), editUser);
Router.patch("/editadmin/:id", upload.single("avatar"), editUserAdmin);

module.exports = Router;

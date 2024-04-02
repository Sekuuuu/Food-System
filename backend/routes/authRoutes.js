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

//User register
Router.post("/signup", upload.single("avatar"), signup);
Router.post("/login", login);
Router.post("/", userVerification);

Router.get("/getall", users);
Router.get("/getone/:id", user);
Router.delete("/delete/:id", deleteUser);
Router.patch("/edit/:id", upload.single("avatar"), editUser);
Router.patch("/editadmin/:id", upload.single("avatar"), editUserAdmin);

module.exports = Router;

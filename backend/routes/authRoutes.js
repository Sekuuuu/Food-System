const { signup, login } = require("../controllers/authController");
const express = require("express");
const Router = express.Router();
const { userVerification } = require("../middleware/authMiddleware");

//User register
Router.post("/signup", signup);
Router.post("/login", login);
Router.post("/", userVerification);

module.exports = Router;

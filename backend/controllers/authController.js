const bcrypt = require("bcrypt");
const { createSecretToken } = require("../util/SecretToken");
const User = require("../models/userModel");
const { json } = require("express");

const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    let user;

    //checks if existing
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.json({ message: "User already exists" });
    }
    //image upload
    let imageFileName = "";

    if (req.file) {
      imageFileName = req.file.filename;
    }

    //checks if customer
    if (role === "customer") {
      const { balance } = req.body;
      user = await User.create({
        name,
        email,
        password,
        role,
        balance,
        image: imageFileName,
      });
    } else {
      user = await User.create({
        name,
        email,
        password,
        role,
        image: imageFileName,
      });
    }

    // const token = createSecretToken(user._id);

    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });

    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });

    next();
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "No such user exists." });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Password Incorrect" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
      withCredentials: true,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });

    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { signup, login };

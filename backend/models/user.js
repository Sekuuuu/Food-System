const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: ["customer", "employee", "admin"],
  },
  balance: {
    type: Number,
  },
  image: String,
});

const User = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      message: "You ain't allowed here",
      status: false,
    });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({
        message: "You massas using the wrong token",
        status: false,
      });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.name });
      else return res.json({ status: false });
    }
  });
};

module.exports = { userVerification };

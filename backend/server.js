require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes");

//Express app
const app = express();

//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors()); //Uses CORS to allow cross-origin requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  console.log("Yes the server is working");
  res.json({ shabda: "iphone" });
});

//Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to database \nListening on port ",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

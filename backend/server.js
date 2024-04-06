require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const itemRoutes = require("./routes/itemRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");

//Express app
const app = express();

//Middlewares
app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions)); //Uses CORS to allow cross-origin requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);

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

const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const item = new Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
    },
    image: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", item);

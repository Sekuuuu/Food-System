const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const order = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    menu_id: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
    },
    date: {
      type: Date,
      default: Date.now,
      // required: [true, "Date is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    status: {
      type: String,
      enum: ["Ordered", "Delivered"],
      default: "Ordered",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", order);

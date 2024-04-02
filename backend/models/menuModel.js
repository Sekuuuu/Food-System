const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const menu = new Schema(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    item_id: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    start_time: {
      type: String,
      required: [true, "Start time is required"],
    },
    end_time: {
      type: String,
      required: [true, "End time is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menu);

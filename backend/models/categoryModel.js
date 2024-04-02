const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const category = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", category);

const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const likes = new Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    user_id_owner: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
    },
    user_id_liker: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Likes", likes);

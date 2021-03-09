const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    post: {
      type: String,
      require: true,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

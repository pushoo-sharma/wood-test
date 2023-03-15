const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: { unique: true },
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);

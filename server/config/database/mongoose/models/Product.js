const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: { unique: true },
    },
    identifier: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

ProductSchema.virtual("supplies", {
  ref: "ProductSupply",
  localField: "_id",
  foreignField: "product",
});

module.exports = mongoose.model("Product", ProductSchema);

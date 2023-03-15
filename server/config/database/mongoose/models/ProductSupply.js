const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSupplySchema = new Schema(
  {
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductSupply", ProductSupplySchema);

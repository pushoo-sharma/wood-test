const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    supply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSupply",
      required: true,
    },
    history: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderHistory",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

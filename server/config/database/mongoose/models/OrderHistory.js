const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderHistorySchema = new Schema(
  {
    totalQuantity: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderHistory", OrderHistorySchema);

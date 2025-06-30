const mongoose = require("mongoose");

const mostSalingProductSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: { type: String, required: true },
    productQuantity: {
      type: Number,
      required: true,
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("mostSalingProducts", mostSalingProductSchema);

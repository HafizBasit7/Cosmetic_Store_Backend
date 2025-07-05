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
    price: {
      type: Number,
      required: true,
      min: 0, // Optional: ensures price isn't negative
    },
    image: String,
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mostSalingProducts", mostSalingProductSchema);

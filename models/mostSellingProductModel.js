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
    description: {
      type: String,
      required: true, // Set to true if every product must have a description
      trim: true,
      maxlength: 1000, // Optional: set a max length
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mostSalingProducts", mostSalingProductSchema);

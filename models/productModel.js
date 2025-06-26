const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

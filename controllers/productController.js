const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const { uploadToCloud } = require('../utils/uploadToCloud');

// Create new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;

    // Validate category
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Invalid category ID' });

    let imageUrl = null;
    if (req.file) {
      const result = await uploadToCloud(req.file.buffer, req.file.originalname, req.file.mimetype);
      if (!result.success) return res.status(500).json({ message: 'Image upload failed', error: result.error });
      imageUrl = result.fileUrl;
    }

    const product = new Product({ name, description, price, image: imageUrl, categoryId });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
};

// Get all products (optional: filter by category)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId', 'name')

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};


const getAllProducts_User_Page = async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId', 'name')

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;

    let updateFields = { name, description, price, categoryId };

    if (req.file) {
      const result = await uploadToCloud(req.file.buffer, req.file.originalname, req.file.mimetype);
      if (!result.success) return res.status(500).json({ message: 'Image upload failed', error: result.error });
      updateFields.image = result.fileUrl;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllProducts_User_Page
};

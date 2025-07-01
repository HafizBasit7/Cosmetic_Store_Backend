const mostSalingProductModel = require("../models/mostSellingProductModel");
const { uploadToCloud } = require("../utils/uploadToCloud");

// ADD a Most Selling Product
const addMostSalingProduct = async (req, res) => {
  try {
    const { name, productQuantity, categoryId } = req.body;
    const existing = await mostSalingProductModel.findOne({ name });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This product already exists in most selling products",
      });
    }

    let productImageUrl = null;
    if (req.file) {
      const result = await uploadToCloud(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
      if (!result.success)
        return res
          .status(500)
          .json({ message: "Image upload failed", error: result.error });
      productImageUrl = result.fileUrl;
    }

    const newProduct = await mostSalingProductModel.create({
      name,
      productQuantity,
      image: productImageUrl,
      categoryId,
    });

    return res.status(201).json({
      success: true,
      message: "Product added to Most Selling Products",
      product: newProduct,
    });
  } catch (error) {
    console.error("Add Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE a Most Selling Product
const updateMostSalingProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, productQuantity, categoryId } = req.body;

    const product = await mostSalingProductModel.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // Update image if file is uploaded
    if (req.file) {
      const result = await uploadToCloud(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
      if (!result.success)
        return res
          .status(500)
          .json({ message: "Image upload failed", error: result.error });
      product.image = result.fileUrl;
    }

    product.name = name || product.name;
    product.productQuantity = productQuantity || product.productQuantity;
    product.categoryId = categoryId || product.categoryId;

    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Product updated", product });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE a Most Selling Product
const deleteMostSalingProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await mostSalingProductModel.findByIdAndDelete(id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET Top 10 Most Selling Products
const getTopMostSalingProducts = async (req, res) => {
  try {
    const mostSalingProducts = await mostSalingProductModel.aggregate([
      {
        $sort: { productQuantity: -1 }, // Top by quantity
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "categories", // collection name of Category (should match DB)
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: "$categoryData",
      },
      {
        $project: {
          _id: 1,
          productName: "$name",
          quantity: "$productQuantity",
          image: "$image",
          categoryName: "$categoryData.name",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      mostSalingProducts,
    });
  } catch (error) {
    console.error("Aggregation Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
const getTopMostSalingProducts_User = async (req, res) => {
  try {
    const mostSalingProducts = await mostSalingProductModel.aggregate([
      {
        $sort: { productQuantity: -1 }, // Top by quantity
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "categories", // collection name of Category (should match DB)
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: "$categoryData",
      },
      {
        $project: {
          _id: 1,
          productName: "$name",
          quantity: "$productQuantity",
          image: "$image",
          categoryName: "$categoryData.name",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      mostSalingProducts,
    });
  } catch (error) {
    console.error("Aggregation Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  addMostSalingProduct,
  updateMostSalingProduct,
  deleteMostSalingProduct,
  getTopMostSalingProducts,
  getTopMostSalingProducts_User
};

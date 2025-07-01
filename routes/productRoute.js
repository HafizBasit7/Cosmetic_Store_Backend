const express = require('express');
const productRouter = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { auth } = require('../middlewares/auth');

const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllProducts_User_Page,
  getDashboardSummary
} = require('../controllers/productController');

productRouter.post('/addProduct', auth, upload.single('image'), addProduct);
productRouter.get('/getAllProducts', auth, getAllProducts);
productRouter.get("/summary", getDashboardSummary);
productRouter.get('/getAllProducts_User_Page', getAllProducts_User_Page);
productRouter.patch('/updateProduct/:id', auth, upload.single('image'), updateProduct);
productRouter.delete('/deleteProduct/:id', auth, deleteProduct);

module.exports = productRouter;

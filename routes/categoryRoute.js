
//////
const express = require('express');
const categoryRouter = express.Router();
const { auth } = require('../middlewares/auth');
const {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// Routes
categoryRouter.get('/getAllCategories', auth, getAllCategories);
categoryRouter.post('/addCategory', auth, addCategory);
categoryRouter.patch('/updateCategory/:id', auth, updateCategory);
//categoryRouter.delete('/deleteCategoty/:id', auth, deleteCategory);
categoryRouter.delete('/deleteCategory/:id', auth, deleteCategory); // FIXED spelling


module.exports = categoryRouter;

const express = require('express');
const adminRouter = express.Router();
const { handleLoginAdmin, getProfile } = require('../controllers/adminController');
const {auth}  = require('../middlewares/auth');

adminRouter.post('/login', handleLoginAdmin);
adminRouter.get('/profile', auth, getProfile);

module.exports = adminRouter;
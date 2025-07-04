const express = require("express");
const adminRouter = express.Router();
const {
  handleLoginAdmin,
  getProfile,
  updatePassword,
} = require("../controllers/adminController");
const { auth } = require("../middlewares/auth");

adminRouter.post("/login", handleLoginAdmin);
adminRouter.get("/profile", auth, getProfile);
adminRouter.patch("/update-password", auth, updatePassword);

module.exports = adminRouter;

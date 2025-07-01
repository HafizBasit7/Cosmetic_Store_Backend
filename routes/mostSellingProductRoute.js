//route
const express = require("express");
const mostSalingProductRouter = express.Router();
const multer = require("multer");
const upload = multer(); // memoryStorage used
const { auth } = require("../middlewares/auth");

const {
  addMostSalingProduct,
  updateMostSalingProduct,
  deleteMostSalingProduct,
  getTopMostSalingProducts,
  getTopMostSalingProducts_User
} = require("../controllers/mostSellingProductController");
mostSalingProductRouter.post(
  "/addMostSalingProduct",
  auth,
  upload.single("image"),
  addMostSalingProduct
);
mostSalingProductRouter.patch(
  "/updateMostSalingProduct/:id",
  auth,
  upload.single("image"),
  updateMostSalingProduct
);
mostSalingProductRouter.delete(
  "/deleteMostSalingProduct/:id",
  auth,
  deleteMostSalingProduct
);
mostSalingProductRouter.get(
  "/getTopMostSalingProduct",
  auth,
  getTopMostSalingProducts
);
mostSalingProductRouter.get(
  "/getTopMostSalingProduct_User",
  getTopMostSalingProducts_User
);

module.exports = mostSalingProductRouter;

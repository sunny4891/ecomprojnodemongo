const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const { UPLOAD_FOLDER } = process.env;

const tempMulter = multer({ dest: UPLOAD_FOLDER });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathImage = path.join(__dirname, "../") + UPLOAD_FOLDER;
    cb(null, pathImage);
  },
  filename: function (req, file, cb) {
    const fileName = new mongoose.Types.ObjectId() + ".png";
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, fileName);
  },
});
const upload = multer({ storage });

const {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controller/product-controller");
const { adminAuthMiddleware } = require("../middlewares/user-auth-middleware");
const productRouter = express.Router();

productRouter.get("/", getProduct);

productRouter.get("/:id", getProduct);

productRouter.post(
  "/",
  adminAuthMiddleware,
  upload.single("image"),
  postProduct
);

productRouter.put("/:id", putProduct);

productRouter.delete("/:id", deleteProduct);

module.exports = { productRouter };

const express = require("express");
const {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controller/product-controller");
const productRouter = express.Router();

productRouter.get("/", getProduct);

productRouter.get("/:id", getProduct);

productRouter.post("/", postProduct);

productRouter.put("/:id", putProduct);

productRouter.delete("/:id", deleteProduct);

module.exports = { productRouter };

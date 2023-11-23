const Joi = require("joi");
const { UPLOAD_FOLDER } = process.env;
const { Product } = require("../models/product");

async function getProduct(req, res) {
  const product = await Product.find();
  res.status(200).json({ product });
}

function productValidation(data) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    price: Joi.number().min(1).required(),
    discount: Joi.number().min(0),
    category: Joi.string().required(),
    active: Joi.boolean(),
  });
  const result = schema.validate(data);
  return result;
}

async function postProduct(req, res, next) {
  let productImage = "";
  if (req?.file?.filename) {
    productImage = UPLOAD_FOLDER + "/" + req?.file?.filename;
  }
  const result = productValidation(req.body);
  if (result.error) {
    return res.status(400).json({ message: result.error.message });
  }
  let product = new Product({ ...result.value, productImage });
  product = await product.save();
  res.status(200).json({ product });
}

function putProduct(req, res) {
  res.status(200).json({ message: "Product PUT api" });
}

function deleteProduct(req, res) {
  res.status(200).json({ message: "Product Delete api" });
}

module.exports = {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};

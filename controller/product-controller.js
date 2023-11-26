const Joi = require("joi");
const { UPLOAD_FOLDER } = process.env;
const { Product } = require("../models/product");

async function getProduct(req, res, next) {
  const _id = req.params.id;
  const { limit, page } = req.query;
  let pageSize = parseInt(limit) || 5;
  let pageNumber = parseInt(page) || 1;
  let sort_by = req.query.sort;
  const skip = pageSize * (pageNumber - 1);
  let product = "";
  if (!_id) {
    product = await Product.find().sort(sort_by).skip(skip).limit(pageSize);
  } else {
    product = await Product.findOne({ _id });
  }
  const count = await Product.countDocuments();

  return res.status(200).json({ product, count });
  return next(new Error("somthing went wrong."));
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

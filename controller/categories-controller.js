const Joi = require("joi");
const { Category } = require("../models/category");
const { Product } = require("../models/product");

async function getCategories(req, res, next) {
  try {
    const products = req?.params?.products;
    const _id = req?.params?.id;

    if (!_id) {
      const category = await Category.find().select("_id name");
      return res.status(200).json({ category });
    }
    if (_id && !products) {
      const category = await Category.findOne({ _id }).select("_id name");
      return res.status(200).json({ category });
    }
    if (_id && products === "products") {
      const product = await Product.find({ category: _id }).populate(
        "category"
      );
      return res.status(200).json({ product });
    }
    return next(new Error("No Data Found"));
  } catch (err) {
    return next(new Error("No Data Found"));
  }
}

async function postCategories(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(40).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(401);
    return next(new Error(result.error.message));
  }
  let category = result.value;
  category = await new Category(result.value).save();
  res
    .status(200)
    .json({ data: category, message: "Data created successfully" });
}

function putCategories(req, res) {
  res.status(200).json({ message: "Categories PUT api" });
}

function deleteCategories(req, res) {
  res.status(200).json({ message: "Categories Delete api" });
}

module.exports = {
  getCategories,
  postCategories,
  putCategories,
  deleteCategories,
};

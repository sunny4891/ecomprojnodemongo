const Joi = require("joi");
const { Category } = require("../models/category");

async function getCategories(req, res) {
  const category = await Category.find().select("_id name");
  res.status(200).json({ data: category });
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

const Joi = require("joi");
const { Order } = require("../models/order");
const { Product } = require("../models/product");

async function getOrders(req, res) {
  const id = req?.params?.id;
  if (id) {
    const orders = await Order.findOne({ _id: id }).populate("user product");
    return res.status(200).json({ orders });
  }
  const orders = await Order.find().populate([
    { path: "product", populate: [{ path: "category", select: "name" }] },
    { path: "user", select: "email name phone" },
  ]);
  return res.status(200).json({ orders });
}

async function getOrderByUser(req, res, next) {
  const user = req.params.id;
  const orders = await Order.find({ user }).populate([
    { path: "product", select: "name price discount productImage" },
    { path: "user", select: "name phone email" },
  ]);
  return res.status(200).json({ orders });
}

async function postOrders(req, res, next) {
  const schema = Joi.object({
    orders: Joi.array()
      .items({
        product: Joi.string().required(),
        user: Joi.string().required(),
        address: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
      })
      .min(1)
      .required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    return next(new Error(result.error.message));
  }

  const { orders } = result.value;

  for (index in orders) {
    let order = orders[index];
    const productId = order.product;
    let product = await Product.findOne({ _id: productId });
    orders[index].price = product.price;
  }

  const order = await Order.create(result.value.orders);

  res.status(200).json({ order });

  //res.status(200).json({ message: "Orders POST api" });
}

async function putOrders(req, res, next) {
  const _id = req.params.id;
  const body = req.body;
  const schema = Joi.object({
    product: Joi.string(),
    user: Joi.string(),
    address: Joi.string(),
    quantity: Joi.number().min(1),
    status: Joi.boolean(),
    payment_method: Joi.string(),
  });
  const { value, error } = schema.validate(req.body);
  if (error) {
    return next(new Error(error.message));
  }

  if (value?.product) {
    value.price = (await Product.findById(value.product)).price;
  }

  const result = await Order.findOneAndUpdate(
    { _id },
    {
      $set: value,
    },
    {
      new: true,
    }
  );

  res.status(200).json({ result });
}

async function deleteOrders(req, res) {
  const _id = req.params.id;
  const result = await Order.deleteOne({ _id });
  res.status(200).json({ result });
}

module.exports = {
  getOrders,
  postOrders,
  putOrders,
  deleteOrders,
  getOrderByUser,
};

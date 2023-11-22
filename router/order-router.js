const express = require("express");
const {
  getOrders,
  postOrders,
  putOrders,
  deleteOrders,
} = require("../controller/orders-controller");
const orderRouter = express.Router();

orderRouter.get("/", getOrders);

orderRouter.get("/:id", getOrders);

orderRouter.post("/", postOrders);

orderRouter.put("/:id", putOrders);

orderRouter.delete("/:id", deleteOrders);

module.exports = { orderRouter };

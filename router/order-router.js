const express = require("express");
const {
  getOrders,
  postOrders,
  putOrders,
  deleteOrders,
} = require("../controller/orders-controller");
const {
  userAuthMiddleware,
  adminAuthMiddleware,
} = require("../middlewares/user-auth-middleware");
const orderRouter = express.Router();

orderRouter.get("/", getOrders);

orderRouter.get("/:id", adminAuthMiddleware, getOrders);

orderRouter.post("/", userAuthMiddleware, postOrders);

orderRouter.put("/:id", userAuthMiddleware, putOrders);

orderRouter.delete("/:id", userAuthMiddleware, deleteOrders);

module.exports = { orderRouter };

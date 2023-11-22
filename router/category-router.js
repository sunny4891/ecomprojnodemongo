const express = require("express");
const {
  getCategories,
  postCategories,
  putCategories,
  deleteCategories,
} = require("../controller/categories-controller");
const { adminAuthMiddleware } = require("../middlewares/user-auth-middleware");

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);

categoryRouter.get("/:id", getCategories);

categoryRouter.post("/", adminAuthMiddleware, postCategories);

categoryRouter.put("/:id", putCategories);

categoryRouter.delete("/:id", deleteCategories);

module.exports = { categoryRouter };

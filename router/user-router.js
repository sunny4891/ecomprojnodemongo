const express = require("express");
const { getOrderByUser } = require("../controller/orders-controller");
const {
  getUser,
  postUser,
  putUser,
  deleteUser,
  loginUser,
  updateUserById,
} = require("../controller/users-controllers");
const {
  userAuthMiddleware,
  adminAuthMiddleware,
} = require("../middlewares/user-auth-middleware");
const userRouter = express.Router();

userRouter.get("/", getUser);

userRouter.get("/:id", getUser);

userRouter.get("/:id/orders", getOrderByUser);

userRouter.post("/", postUser);

userRouter.post("/login", loginUser);

userRouter.put("/", userAuthMiddleware, putUser);
userRouter.put("/:id", adminAuthMiddleware, updateUserById);

userRouter.delete("/:id", deleteUser);

module.exports = { userRouter };

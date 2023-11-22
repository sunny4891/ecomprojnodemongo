const express = require("express");
const {
  getUser,
  postUser,
  putUser,
  deleteUser,
  loginUser,
} = require("../controller/users-controllers");
const { userAuthMiddleware } = require("../middlewares/user-auth-middleware");
const userRouter = express.Router();

userRouter.get("/", getUser);

userRouter.get("/:id", getUser);

userRouter.post("/", postUser);

userRouter.post("/login", loginUser);

userRouter.put("/:id", userAuthMiddleware, putUser);

userRouter.delete("/:id", deleteUser);

module.exports = { userRouter };

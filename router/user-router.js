const express = require("express");
const {
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controller/users-controllers");
const userRouter = express.Router();

userRouter.get("/", getUser);

userRouter.get("/:id", getUser);

userRouter.post("/", postUser);

userRouter.put("/:id", putUser);

userRouter.delete("/:id", deleteUser);

module.exports = { userRouter };

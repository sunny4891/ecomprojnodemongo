const express = require("express");
const testRouter = express.Router();

testRouter.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

module.exports = testRouter;

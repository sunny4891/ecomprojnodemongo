const express = require("express");
const errorHandler = require("./middlewares/error-handler");
const helmet = require("helmet");
const cors = require("cors");
require("express-async-errors");
const morgan = require("morgan");
//enviorment variable configuration
require("dotenv").config();
console.log(process.env.DB_URL);
const { UPLOAD_FOLDER } = process.env;
const { createConnection } = require("./database/connection");

const {
  categoryRouter,
  orderRouter,
  productRouter,
  userRouter,
} = require("./router/routers");
// const { categoryRouter } = require("./router/category-router");
// const { orderRouter } = require("./router/order-router");
// const { productRouter } = require("./router/product-router");
// const { userRouter } = require("./router/user-router");
const testRouter = require("./test");
const app = express();

// throw new Error("testing error");
Promise.reject(new Error("From Promise"));

const apiRouter = express.Router();

app.use(morgan("dev"));
// app.use(helmet());
app.use(cors());
app.use(express.json());
createConnection();

apiRouter.get("", (req, res) => {
  res.status(200).json({ message: "API is working" });
});
app.use("/api", apiRouter);

apiRouter.use("/test", testRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/orders", orderRouter);
apiRouter.get("/" + UPLOAD_FOLDER + "/*", (req, res, next) => {
  const path = req.url;
  const filePath = `${__dirname}${path}`;
  res.sendFile(filePath, (err) => {
    next();
  });
});

app.use(apiRouter);
app.use(errorHandler);
console.log("server.js");
module.exports = { app };

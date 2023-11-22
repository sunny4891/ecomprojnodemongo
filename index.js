const express = require("express");
const morgan = require("morgan");
const { createConnection } = require("./database/connection");
const errorHandler = require("./middlewares/error-handler");
const { categoryRouter } = require("./router/category-router");
const { orderRouter } = require("./router/order-router");
const { productRouter } = require("./router/product-router");
const { userRouter } = require("./router/user-router");
const testRouter = require("./test");
const app = express();
const apiRouter = express.Router();

app.listen("5000", () => {
  console.log("my server is running on port number 5000");
});
app.use(morgan("dev"));
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

app.use(apiRouter);
app.use(errorHandler);

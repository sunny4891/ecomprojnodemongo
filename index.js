const express = require("express");
const morgan = require("morgan");
const { createConnection } = require("./database/connection");
const testRouter = require("./test");
const app = express();
const apiRouter = express.Router();
const commonApiRouter = express.Router();

app.listen("5000", () => {
  console.log("my server is running on port number 5000");
});
app.use(morgan("dev"));
app.use(express.json());
createConnection();
apiRouter.use("/api", commonApiRouter);
commonApiRouter.use("/test", testRouter);

app.use(apiRouter);

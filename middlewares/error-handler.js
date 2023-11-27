const { logger } = require("../logger/logger");

process.on("uncaughtException", (err) => {
  logger.error(err.message, err);
  console.log("uncaughtException");
});

process.on("unhandledRejection", (err) => {
  logger.error(err.message, err);
  console.log("unhandledRejection");
});

function errorHandler(err, req, res, next) {
  try {
    if (res?.statusCode === 200) {
      logger.error(err.message, err);
      res.status(500);
    }
    res.json({
      err: err.message || "Something went wrong",
      info: "error handler",
    });
  } catch (error) {
    next();
  }
}

module.exports = errorHandler;

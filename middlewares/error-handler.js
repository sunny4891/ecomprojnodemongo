process.on("uncaughtException", (err) => {
  console.log("uncaughtException");
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection");
});

function errorHandler(err, req, res, next) {
  try {
    if (res.statusCode) {
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

function errorHandler(err, req, res, next) {
  try {
    if (res.statusCode) {
      res.status(500);
    }
    res.json({ err: err.message, info: "error handler" });
  } catch (error) {
    next();
  }
}

module.exports = errorHandler;

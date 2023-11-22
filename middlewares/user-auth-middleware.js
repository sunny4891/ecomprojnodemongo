const jwt = require("jsonwebtoken");

function userAuthMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const payload = jwt.verify(token, "JWTSECRATEKEY_1234");
      req.session = { user: payload };
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    return res.json({ error: "Invalid Token" });
  }
}

module.exports = { userAuthMiddleware };

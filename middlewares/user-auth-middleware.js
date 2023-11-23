const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

function userAuthMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const payload = jwt.verify(token, JWT_KEY);
      req.session = { user: payload };
    } else {
      res.status(401);
      return res.json({ error: "Invalid Token" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    return res.json({ error: "Invalid Token" });
  }
}

function adminAuthMiddleware(req, res, next) {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
      const payload = jwt.verify(token, JWT_KEY);
      req.session = { user: payload };

      if (payload?.isAdmin) {
        return next();
      } else {
        res.status(401);
        return res.json({ error: "You are not authorised to access resource" });
      }
    } else {
      res.status(401);
      return res.json({ error: "Invalid Token" });
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    return res.json({ error: "Invalid Token" });
  }
}

module.exports = { userAuthMiddleware, adminAuthMiddleware };

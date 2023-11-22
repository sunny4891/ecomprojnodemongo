const { User } = require("../models/user");
const Joi = require("joi");
const passwordHash = require("password-hash");
function getUser(req, res) {
  res.status(200).json({ message: "User Get api" });
}

async function postUser(req, res, next) {
  //   res.status(200).json({ message: "User POST api" });
  const schema = Joi.object({
    name: Joi.string().min(4).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    repassword: Joi.string().min(6).max(30).required(),
    phone: Joi.string().min(10).max(12),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    //throw error
    // return res.status(400).json({ error: result.error.message });
    res.status(400);
    return next(new Error(result.error.message));
  }

  const userData = result.value;

  if (userData.password != userData.repassword) {
    res.status(400);
    return next(new Error("password not matched"));
  }

  // check if user is uniqe

  let user = await User.findOne({ email: userData.email });
  if (!user) {
    userData.password = passwordHash.generate(userData.password);
    user = await new User(userData).save();
  } else {
    res.status(400);
    return next(new Error("Email already registered"));
  }

  return res.status(200).json({ data: user });
}

function putUser(req, res) {
  res.status(200).json({ message: "User PUT api" });
}

function deleteUser(req, res) {
  res.status(200).json({ message: "User Delete api" });
}

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
};

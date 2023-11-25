const { User } = require("../models/user");
const Joi = require("joi");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

function getUser(req, res) {
  res.status(200).json({ message: "User Get api" });
}

function validateUserForRegistration(userData) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    repassword: Joi.string().min(6).max(30).required(),
    phone: Joi.string().min(10).max(12),
  });
  const result = schema.validate(userData);
  return result;
}

function validateUserLogin(userData) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  });
  const result = schema.validate(userData);
  return result;
}

async function loginUser(req, res, next) {
  const result = validateUserLogin(req.body);
  if (result.error) {
    return next(new Error(result.error.message));
  }
  const { email, password } = result.value;
  const user = await User.findOne({ email });
  if (user) {
    const isPasswordMatched = passwordHash.verify(password, user.password);
    if (isPasswordMatched) {
      //login success
      const payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.JWT_KEY);
      return res.status(200).json({ mmessage: "Login Success", token });
    }
  }
  //return error
  const err = new Error("Email or Password invalid");
  return next(err);
}

async function postUser(req, res, next) {
  //   res.status(200).json({ message: "User POST api" });
  const result = validateUserForRegistration(req.body);
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

  //   let user = await User.findOne({ email: userData.email });

  let user = await User.isExists(userData.email);

  if (!user) {
    userData.password = passwordHash.generate(userData.password);
    user = await new User(userData).save();
  } else {
    res.status(400);
    return next(new Error("Email already registered"));
  }

  return res.status(200).json({ data: user });
}

async function putUser(req, res, next) {
  const loggedInUser = req.session.user;
  const schema = Joi.object({
    phone: Joi.string().min(10).max(12),
    name: Joi.string().min(4).max(40),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(401);
    const err = new Error(result.error.message);
    return next(err);
  } else {
    const user = await User.findOneAndUpdate(
      { _id: loggedInUser._id },
      {
        $set: result.value,
      },
      { new: true }
    );
    res.status(200).json(user);
  }
}

async function updateUserById(req, res, next) {
  const user_id = req.params.id;

  const user = await User.findOneAndUpdate(
    { _id: user_id },
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json(user);
}

function deleteUser(req, res) {
  res.status(200).json({ message: "User Delete api" });
}

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
  loginUser,
  updateUserById,
};

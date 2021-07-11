const { User } = require("../../db/models");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  const password = req.body.password;
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    req.body.password = hash;
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "User created!" });
  } catch (error) {
    next(error);
  }
};

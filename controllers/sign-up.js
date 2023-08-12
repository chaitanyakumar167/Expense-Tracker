const SignUp = require("../models/sign-up");
const bcrypt = require("bcrypt");

exports.postSignUp = async (req, res, next) => {
  try {
    const { name, email, number, password } = req.body;

    const users = await SignUp.findAll({ where: { email } });

    if (users.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (!err) {
      }
      await SignUp.create({
        name: name,
        email: email,
        number: number,
        password: hash,
      });
      res.status(201).json({ message: "account created successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

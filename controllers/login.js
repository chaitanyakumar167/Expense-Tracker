const SignUp = require("../models/sign-up");
const bcrypt = require("bcrypt");

exports.postLogIn = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const users = await SignUp.findAll({ where: { email: email } });
    if (users.length > 0) {
      bcrypt.compare(password, users[0].password, (err, result) => {
        if (err) {
          throw new Error("something went wrong");
        }
        if (result === true) {
          return res.status(202).json({ message: "User login sucessful" });
        } else {
          return res.status(401).json({ message: "User not authorized" });
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

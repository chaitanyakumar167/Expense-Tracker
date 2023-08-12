const SignUp = require("../models/sign-up");

exports.postLogIn = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const users = await SignUp.findAll();
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      if (users[i].password === password) {
        return res.status(202).send({ message: "User login sucessful" });
      } else {
        return res.status(401).send({ error: "User not authorized" });
      }
    }
  }

  res.status(404).send({ error: "User not found" });
};

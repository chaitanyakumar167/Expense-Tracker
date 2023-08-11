const SignUp = require("../models/sign-up");
let flag;

exports.postSignUp = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const password = req.body.password;

    const users = await SignUp.findAll();
    let flag = true;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        flag = false;
        break;
      }
    }

    if (flag) {
      const response = await SignUp.create({
        name: name,
        email: email,
        number: number,
        password: password,
      });
      if (response) {
        res.json(response.id);
      }
    } else {
      res.status(409).send({ error: "User already exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
const Sequelize = require("./util/database");
const signUpRouter = require("./routes/sign-up");
const logInRouter = require("./routes/login");

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/user", signUpRouter);
app.use("/user", logInRouter);

Sequelize.sync()
  .then(() => {
    // app.listen(4000);
  })
  .catch((err) => console.log(err));
app.listen(4000);

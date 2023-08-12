const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
const Sequelize = require("./util/database");
const signUpRouter = require("./routes/sign-up");
const logInRouter = require("./routes/login");
const expenseRouter = require("./routes/expense");

const User = require("./models/sign-up");
const Expenses = require("./models/expense");

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/user", signUpRouter);
app.use("/user", logInRouter);
app.use("/user", expenseRouter);

User.hasMany(Expenses);
Expenses.belongsTo(User);

Sequelize.sync()
  .then(() => {
    // app.listen(4000);
  })
  .catch((err) => console.log(err));
app.listen(4000);

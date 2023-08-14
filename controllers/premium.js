const Expense = require("../models/expense");
const Users = require("../models/sign-up");

exports.showLeaderBoard = async (req, res) => {
  try {
    const users = Users.findAll();
    const expenses = Expense.findAll();

    Promise.all([users, expenses])
      .then((data) => {
        const arr = [];
        data[0].forEach((element) => {
          arr.push({ name: element.name, userId: element.id });
        });

        for (let i = 0; i < arr.length; i++) {
          let u = data[1]
            .filter((ele) => ele.userId === arr[i].userId)
            .reduce((sum, cur) => sum + cur.amount, 0);
          arr[i].totalExpenses = u;
        }

        arr.sort((a, b) => b.totalExpenses - a.totalExpenses);

        res.status(200).json(arr);
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    res.status(403).json({ error: error });
  }
};

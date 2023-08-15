const Expense = require("../models/expense");

exports.postAddExpense = async (req, res, next) => {
  try {
    const { amount, description, category } = req.body;

    const expense = await req.user.createExpense({
      amount: amount,
      description: description,
      category: category,
    });
    await req.user.update({ totalExpenses: req.user.totalExpenses + +amount });
    if (expense) {
      res.json(expense.id);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const id = req.params.id;

    // await Expense.destroy({ where: { id: id } });
    const expense = await Expense.findByPk(id);
    const amount = expense.amount;
    const promise1 = expense.destroy();
    const promise2 = req.user.update({
      totalExpenses: req.user.totalExpenses - amount,
    });
    Promise.all([promise1, promise2])
      .then(() => {
        res.status(200).json({ message: "delete sucessful" });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await req.user.getExpenses();
    res.json(expenses);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

exports.isPremiumUser = (req, res) => {
  return res.status(202).json(req.user.isPremium);
};

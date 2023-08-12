const Expense = require("../models/expense");

exports.postAddExpense = async (req, res, next) => {
  try {
    const { amount, description, category } = req.body;

    const expense = await req.user.createExpense({
      amount: amount,
      description: description,
      category: category,
    });
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
    await Expense.destroy({ where: { id: id } });
    res.status(200).json({ message: "delete sucessful" });
    // const expense = await Expense.findByPk(id);
    // if (expense) {
    //   expense.destroy();
    // }
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
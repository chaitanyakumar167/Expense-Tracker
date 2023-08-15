const Expense = require("../models/expense");
const sequelize = require("../util/database");
const Users = require("../models/sign-up");

exports.postAddExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { amount, description, category } = req.body;

    const expense = await Expense.create(
      {
        amount: amount,
        description: description,
        category: category,
      },
      { where: { id: req.user.id } },
      { transaction: t }
    );
    await Users.update(
      { totalExpenses: req.user.totalExpenses + +amount },
      { where: { id: req.user.id } },
      { transaction: t }
    );
    await t.commit();
    return res.json(expense.id);
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ message: err });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;

    // await Expense.destroy({ where: { id: id } });
    const expense = await Expense.findByPk(id);
    const amount = expense.amount;
    await Expense.destroy({ where: { id: id } }, { transaction: t });
    await req.user.update(
      {
        totalExpenses: req.user.totalExpenses - amount,
      },
      { transaction: t }
    );
    await t.commit();
    res.status(200).json({ message: "delete sucessful" });
  } catch (err) {
    await t.rollback();
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

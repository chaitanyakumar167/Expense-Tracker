const express = require("express");
const router = express.Router();

const userAuthentication = require("../middleware/auth");

const expenseController = require("../controllers/expense");

router.post(
  "/add-expense",
  userAuthentication.authenticate,
  expenseController.postAddExpense
);

router.delete(
  "/delete-expense/:id",
  userAuthentication.authenticate,
  expenseController.deleteExpense
);

router.get(
  "/all-expenses",
  userAuthentication.authenticate,
  expenseController.getAllExpenses
);

router.get(
  "/is-premium-user",
  userAuthentication.authenticate,
  expenseController.isPremiumUser
);

module.exports = router;

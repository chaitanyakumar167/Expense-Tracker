const Expense = require("../models/expense");
const Users = require("../models/sign-up");
const sequelize = require("../util/database");

exports.showLeaderBoard = async (req, res) => {
  try {
    const leaderBoardOfUsers = await Users.findAll({
      attributes: ["id", "name", "totalExpenses"],
      order: [["totalExpenses", "DESC"]],
    });

    res.status(200).json(leaderBoardOfUsers);
  } catch (error) {
    res.status(403).json({ error: error });
  }
};

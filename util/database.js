const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense-tracker", "root", "Chaithanya@121", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

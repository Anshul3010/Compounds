const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.compound = require("./compoundModel")(sequelize, Sequelize);

module.exports = db;
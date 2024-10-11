const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('invent', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
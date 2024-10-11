const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Book = require('./book')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Borrow = require('./borrow')(sequelize, Sequelize);
db.Rating = require('./rating')(sequelize, Sequelize);

db.Book.hasMany(db.Borrow, { as: 'borrows' });
db.User.hasMany(db.Borrow, { as: 'borrows' });
db.Book.hasMany(db.Rating, { as: 'ratings' });
db.User.hasMany(db.Rating, { as: 'ratings' });

module.exports = db;
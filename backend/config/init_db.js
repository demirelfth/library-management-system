const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const { Book, User, Borrow, Rating } = require('../models');

sequelize.sync({ force: true }).then(async () => {
    console.log('Database & tables created!');
  
    // Added dummy book data
    await Book.bulkCreate([
        { title: "Empati", author: 'Adam Fawer', year: 2007 },
        { title: "Improbable", author: 'Adam Fawer', year: 2005 },
        { title: "Zirve", author: 'Robert Pool', year: 2018 },
        { title: "The Art of Deception", author: 'Kevin Mitnick', year: 2001 },
        { title: "The Art of Intrusion", author: 'Kevin Mitnick', year: 2005 },
    ]);
    
    // Added dummy user data
    await User.bulkCreate([
      { name: 'Ahmet', email: 'ahmet@gmail.com' },
      { name: 'Mehmet', email: 'mehmet@gmail.com' },
      { name: 'Zeynep', email: 'zeynep@gmail.com' },
      { name: 'Gamze', email: 'gamze@gmail.com' },
      { name: 'Gizem', email: 'gizem@gmail.com' },
    ]);

    // Added dummy borrow data
    await Borrow.bulkCreate([
      { borrow_date: '09-07-2024', return_date: '24-07-2024', BookId: 1, UserId: 2 },
      { borrow_date: '15-07-2024', return_date: '22-07-2024', BookId: 2, UserId: 3 },
      { borrow_date: '12-07-2024', return_date: '21-07-2024', BookId: 3, UserId: 1 },
    ]);

    // Added dummy rating data
    await Rating.bulkCreate([
        { quantity: 7, BookId: 1, UserId: 2 },
        { quantity: 5, BookId: 2, UserId: 3 },
        { quantity: 8, BookId: 3, UserId: 1 },
      ]);
  
    console.log('Dummy data inserted!');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

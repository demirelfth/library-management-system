const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const { Book, User, Borrow, Rating } = require('../models');

sequelize.sync({ force: true }).then(async () => {
    console.log('Database & tables created!');
  
    // Added dummy book data
    await Book.bulkCreate([
        { title: "Gnosis", author: 'Adam Fawer', year: 2007 },
        { title: "Improbable", author: 'Adam Fawer', year: 2005 },
        { title: "Peak", author: 'Robert Pool', year: 2018 },
        { title: "The Art of Deception", author: 'Kevin Mitnick', year: 2001 },
        { title: "The Art of Intrusion", author: 'Kevin Mitnick', year: 2005 },
        { title: "Leonardo Da Vinci", author: 'Walter Isaacson', year: 2007 },
        { title: "The Code Breaker", author: 'Walter Isaacson', year: 2005 },
        { title: "Steve Jobs", author: 'Walter Isaacson', year: 2018 },
        { title: "Learn To Earn", author: 'Peter Lynch', year: 2001 },
        { title: "Beating The Street", author: 'Peter Lynch', year: 2005 },
    ]);
    
    // Added dummy user data
    await User.bulkCreate([
      { name: 'Ahmet', email: 'ahmet@gmail.com' },
      { name: 'Mehmet', email: 'mehmet@gmail.com' },
      { name: 'Zeynep', email: 'zeynep@gmail.com' },
      { name: 'Gamze', email: 'gamze@gmail.com' },
      { name: 'Gizem', email: 'gizem@gmail.com' },
      { name: 'Kenan', email: 'kenan@gmail.com' },
      { name: 'Pelin', email: 'pelin@gmail.com' },
      { name: 'Umay', email: 'umay@gmail.com' },
    ]);

    // Added dummy borrow data
    await Borrow.bulkCreate([
      { borrow_date: 'Fri Oct 11 2024 23:46:40 GMT+0300 (GMT+03:00)', return_date: 'Fri Oct 11 2024 23:55:46 GMT+0300 (GMT+03:00)', BookId: 1, UserId: 2 },
      { borrow_date: 'Fri Oct 11 2024 23:56:52 GMT+0300 (GMT+03:00)', return_date: 'Fri Oct 11 2024 23:57:11 GMT+0300 (GMT+03:00)', BookId: 2, UserId: 3 },
      { borrow_date: 'Sun Oct 13 2024 00:36:34 GMT+0300 (GMT+03:00)', return_date: 'Sun Oct 13 2024 00:36:47 GMT+0300 (GMT+03:00)', BookId: 3, UserId: 1 },
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

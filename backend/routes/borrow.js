const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const borrowController = require('../controllers/borrowController');

router.get('/books', bookController.getBooks);
router.get('/books/:book_id', bookController.getBook);

router.get('/users', userController.getUsers);
router.get('/users/:user_id', userController.getUser);

router.post('/users/:user_id/borrow/:book_id', borrowController.borrowBook);
router.post('/users/:user_id/return/:book_id', borrowController.returnBook);

router.get('/borrowed/user/:user_id', borrowController.borrowedBooks);
router.get('/borrowed/book/:book_id', borrowController.borrowedBook);

module.exports = router;
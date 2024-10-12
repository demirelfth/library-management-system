const { Book, User, Borrow, Rating } = require('../models');

exports.borrowBook = async (req, res) => {

  try{
    const user_id = req.params.user_id;
    const book_id = req.params.book_id;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const book = await Book.findByPk(book_id);
    if (!book) {
      return res.status(400).json({ message: 'Book not found' });
    }

    const existingBorrow = await Borrow.findOne({
      where: {
        BookId: book_id,
        return_date: ""
      }
    });

    if (existingBorrow) {
      return res.status(400).json({ message: 'Book is already borrowed' });
    }

    const borrow = await Borrow.create({
      UserId: user_id,
      BookId: book_id,
      borrow_date: (new Date()).toString(),
      return_date: ""
    });

    return res.status(200).json({ message: 'Book borrowed successfully', borrow });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.returnBook = async (req, res) => {

  try {
    const user_id = req.params.user_id;
    const book_id = req.params.book_id;
    const { score } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const book = await Book.findByPk(book_id);
    if (!book) {
      return res.status(400).json({ message: 'Book not found' });
    }

    const existingBorrow = await Borrow.findOne({
      where: {
        BookId: book_id,
        UserId: user_id,
        return_date: ""
      }
    });

    if (!existingBorrow) {
      return res.status(400).json({ message: 'No active borrow record found for this book' });
    }

    existingBorrow.return_date = (new Date()).toString();
    await existingBorrow.save();

    if (score) {
      const rating = await Rating.create({
        UserId: user_id,
        BookId: book_id,
        quantity: score
      });
      console.log(`Rating added for user ${user_id} for book ${book_id} with score ${score}`);
    }

    return res.status(200).json({ message: 'Book returned successfully', borrow: existingBorrow });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.borrowedBooks = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const borrowedBooks = await Borrow.findAll({
      where: { UserId: user_id }
    });

    if (!borrowedBooks || borrowedBooks.length === 0) {
      return res.status(400).json({ message: 'No borrowed books found for this user' });
    }

    return res.status(200).json({ message: 'Borrowed books retrieved successfully', books: borrowedBooks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.borrowedBook = async (req, res) => {
  try {
    const book_id = req.params.book_id;

    const book = await Book.findByPk(book_id);
    if (!book) {
      return res.status(400).json({ message: 'Book not found' });
    }

    const activeBorrow = await Borrow.findOne({
      where: { BookId: book_id, return_date: "" }
    });

    if (!activeBorrow) {
      return res.status(200).json({ message: 'The book is available and not currently borrowed' });
    }

    const user = await User.findByPk(activeBorrow.UserId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'The book is currently borrowed',
      borrowedBy: user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

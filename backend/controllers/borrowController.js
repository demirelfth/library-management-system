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
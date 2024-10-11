const { User, Borrow } = require('../models');

exports.getBooks = async (req, res) => {
  try {
    const borrowedBooks = await Borrow.findAll({
        attributes: ['bookId']
    });
    
    const borrowedBookIds = borrowedBooks.map(borrow => borrow.bookId);
    
    const availableBooks = await Book.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.notIn]: borrowedBookIds } },
                { return_date: { [Op.isNot]: null } }
            ]
        }
    });
    
    if (availableBooks.length === 0) {
        return res.status(400).json({ message: 'No available books found' });
    }
    
    res.status(200).json(availableBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBook = async (req, res) => {
    const book_id = req.headers['book_id'];

    try {
        const borrowedBooks = await Borrow.findAll({
            attributes: ['bookId']
        });
        
        const borrowedBookIds = borrowedBooks.map(borrow => borrow.bookId);

        const availableBooks = await Book.findAll({
            where: {
                [Op.or]: [
                    { id: { [Op.notIn]: borrowedBookIds, [Op.eq]: book_id }},
                    { return_date: { [Op.isNot]: null }}
                ]
            }
        });

        const lendedBooks = await Book.findAll({
            where: {
                [Op.or]: [
                    { id: { [Op.in]: borrowedBookIds, [Op.eq]: book_id, return_date: { [Op.is]: null }}},
                ]
            }
        });
        
        if (availableBooks.length === 0) {
            res.status(200).json({
                message: "Lended books found.",
                lendedBooks
            });
        }else{
            res.status(200).json({
                message: "Available books found.",
                availableBooks
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
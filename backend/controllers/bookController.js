const { Book } = require('../models');

exports.getBooks = async (req, res) => {

    try {
        const books = await Book.findAll();
        if (!books) {
            return res.status(400).json({ message: 'No available books found' });
        }
        
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBook = async (req, res) => {
    const book_id = req.params.book_id;

    try {
        const book = await Book.findByPk(book_id);
        if (!book) {
            return res.status(400).json({ message: 'Book not found' });
        }
        
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
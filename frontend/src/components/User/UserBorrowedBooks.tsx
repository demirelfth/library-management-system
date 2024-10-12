import React, { useEffect, useState } from 'react';
import { fetchBorrowedBooks, returnBorrowedBook } from '../../api/borrowApi';
import Loader from '../../components/Common/Loader';
import { useParams } from 'react-router-dom';

interface Borrow {
    id: number;
    BookId: number;
    borrow_date: string;
    return_date: string;
    UserId: number;
}

interface Book {
    id: number;
    title: string;
    author: string;
    year: string;
}

interface Rating {
    id: number;
    quantity: number;
    BookId: number;
    UserId: number;
}

interface BorrowedBooksData {
    borrows: Borrow[];
    books: Book[];
    ratings: Rating[];
}

const BorrowedBooks = () => {
    const [data, setData] = useState<BorrowedBooksData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams<{ id: string }>();
    const [scores, setScores] = useState<Record<number, string>>({}); // Puanları yönetmek için

    useEffect(() => {
        const fetchData = async () => {
            let result;
            try {
                if (id) {
                    result = await fetchBorrowedBooks(parseInt(id));
                }
                setData(result);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        // return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div className="no-data">
                    <h2>No Books Found</h2>
                    <p>Currently, there are no borrowed books exist.</p>
                </div>
    }

    const handleButtonClick = (bookId: number) => {
        const score = scores[bookId];
        const fetchData = async () => {
            let result;
            try {
                if (id) {
                    result = await returnBorrowedBook(parseInt(id), bookId, parseInt(score));
                }
                setData(result);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    };

    return (
        <div className="borrowed-books">
            {data.borrows.filter(borrow => borrow.return_date === "").length > 0 && (
                <>
                    <h2>Currently Borrowed Books</h2>
                    <ul>
                        {data.borrows.filter(borrow => borrow.return_date === "").map((borrow) => (
                            <li key={borrow.id}>
                                <p><strong>Borrow Date:</strong> {new Date(borrow.borrow_date).toLocaleString()}</p>
                                <p><strong>Return Date:</strong> {'Not returned yet'}</p>

                                {data.books.find(book => book.id === borrow.BookId) && (
                                    <div className="book-details">
                                        <h4>Book Details:</h4>
                                        <p><strong>Title:</strong> {data.books.find(book => book.id === borrow.BookId)?.title}</p>
                                        <p><strong>Author:</strong> {data.books.find(book => book.id === borrow.BookId)?.author}</p>
                                        <p><strong>Year:</strong> {data.books.find(book => book.id === borrow.BookId)?.year}</p>
                                    </div>
                                )}

                                <input
                                    className='score-input'
                                    type="number"
                                    placeholder="Enter your score"
                                    min="1"
                                    max="10"
                                    required
                                    onChange={(e) => setScores(prevScores => ({
                                        ...prevScores,
                                        [borrow.BookId]: e.target.value // Puanı duruma ekle
                                    }))}
                                />

                                <button
                                    className='return-button'
                                    onClick={() => handleButtonClick(borrow.BookId)} // Kitap ID'sini geç
                                >
                                    Return Book
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {data.borrows.filter(borrow => borrow.return_date !== "").length > 0 && (
                <>
                    <h2>Previously Borrowed Books</h2>
                    <ul>
                        {data.borrows.filter(borrow => borrow.return_date !== "").map((borrow) => (
                            <li key={borrow.id}>
                                <p><strong>Borrow Date:</strong> {new Date(borrow.borrow_date).toLocaleString()}</p>
                                <p><strong>Return Date:</strong> {new Date(borrow.return_date).toLocaleString()}</p>

                                {data.books.find(book => book.id === borrow.BookId) && (
                                    <div className="book-details">
                                        <h4>Book Details:</h4>
                                        <p><strong>Title:</strong> {data.books.find(book => book.id === borrow.BookId)?.title}</p>
                                        <p><strong>Author:</strong> {data.books.find(book => book.id === borrow.BookId)?.author}</p>
                                        <p><strong>Year:</strong> {data.books.find(book => book.id === borrow.BookId)?.year}</p>
                                        
                                        {data.ratings.some(rating => rating?.BookId === borrow.BookId) ? (
                                            <p><strong>Rating:</strong> {data.ratings.find(rating => rating?.BookId === borrow.BookId)?.quantity}</p>
                                        ) : (
                                            <p><strong>Rating:</strong> Not rated yet</p>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default BorrowedBooks;
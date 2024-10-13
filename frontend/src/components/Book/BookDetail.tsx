import React, { useEffect, useState } from 'react';
import { fetchBookById  }from '../../api/bookApi';
import Loader from '../../components/Common/Loader';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
}

interface BookDetailProps {
    rating: string | null;
}

const BookDetail: React.FC<BookDetailProps> = ({ rating }) => {
    const [book, setBook] = useState<Book>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams<{ id: string }>();
  
    useEffect(() => {
      const getUser = async () => {
        try {
            if (id) {
                const bookData = await fetchBookById(parseInt(id));
                setBook(bookData);
            }
        } catch (err:unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occured');
            }
        } finally {
          setLoading(false);
        }
      };
      getUser();
    }, [id]);
  
    if (loading) return <Loader/>
    if (error) return <p>{error}</p>;
    if (!book) return <p>No book found</p>;
  
    return (
        <div>
            <Link to="/" style={{ textDecoration: 'none', textAlign: 'center'}}><h1>Library Management System</h1></Link>
            <header className="header">
                <h2>Book Details</h2>
            </header>
            <section className="user-details">
                <p>Title: &nbsp;&nbsp;&nbsp;&nbsp;  {book.title}</p>
                <p>Author: &nbsp;                   {book.author}</p>
                <p>Year: &nbsp;&nbsp;&nbsp;&nbsp;   {book.year}</p>
                <p>Average Rating: &nbsp; {rating !== null ? rating : "No ratings yet"}</p>
            </section>
        </div>
    );
};
  
export default BookDetail;

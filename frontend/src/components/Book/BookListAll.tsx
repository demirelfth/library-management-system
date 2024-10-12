import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../../api/bookApi';
import Loader from '../../components/Common/Loader';
import { Link } from 'react-router-dom';

// Book Interface
interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
}

const HomeBookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const getBooks = async () => {
        try {
          const bookData = await fetchBooks();
          setBooks(bookData);
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
      getBooks();
    }, []);
  
    if (loading) return <Loader/>
    if (error) return <p>{error}</p>;
  
    return (
      <div>
        <ul>
          {books.map((book) => (
            <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: '#000' }}>
              <li key={book.id}>
                    {book.title}, <span style={{ fontStyle: 'italic', fontSize: '0.8em' }}>{book.author}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
};
  
export default HomeBookList;
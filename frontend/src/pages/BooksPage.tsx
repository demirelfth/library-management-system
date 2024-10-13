import React from 'react';
import BookListAll from '../components/Book/BookListAll';
import '../styles/pages/BooksPage.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <Link to="/" style={{ textDecoration: 'none', textAlign: 'center'}}><h1>Library Management System</h1></Link>
      <header className="header">
            <h1>Book List</h1>
      </header>
      
      <section className="book-list">
        <BookListAll/>
      </section>

    </div>
  );
};

export default Home;

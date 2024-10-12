import React from 'react';
import BookListAll from '../components/Book/BookListAll';
import '../styles/pages/BooksPage.scss';

const Home = () => {
  return (
    <div className="container">
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

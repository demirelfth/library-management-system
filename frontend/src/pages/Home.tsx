import React from 'react';
import BookList from '../components/Book/BookList';
import UserList from '../components/User/UserList';
import '../styles/pages/Home.scss';

const Home = () => {
  return (
    <div className="container">
      <header className="header">
            <h1>Welcome to the Library Management System!</h1>
            <img 
              src="/library2.jpg"
              alt="Library Interior" 
              className="header-image"
            />
      </header>


      <section className='book-list'>
        <BookList/>
      </section>
      
      <section className="user-list">
        <UserList/>
      </section>

    </div>
  );
};

export default Home;

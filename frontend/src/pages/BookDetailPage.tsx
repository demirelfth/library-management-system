import React, { useState } from 'react';
import BookDetail from '../components/Book/BookDetail';
import BookBorrowStatus from '../components/Book/BookBorrowStatus';
import '../styles/pages/BookDetailPage.scss';

const Home = () => {
  const [rating, setRating] = useState<string | null>(null); 

  return (
    <div className='container'>
      <BookDetail rating={rating} />
      <BookBorrowStatus setRating={setRating} />
    </div>
  );
};

export default Home;

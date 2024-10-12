import React from 'react';
import UserDetail from '../components/User/UserDetail';
import UserBorrowedBooks from '../components/User/UserBorrowedBooks';
import '../styles/pages/UserDetailPage.scss';

const Home = () => {

  return (
    <div className='container'>
      <UserDetail />
      <UserBorrowedBooks />
    </div>
  );
};

export default Home;

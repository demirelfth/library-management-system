import React from 'react';
import UserListAll from '../components/User/UserListAll';
import '../styles/pages/UsersPage.scss';

const Home = () => {
  return (
    <div className="container">
      <header className="header">
            <h1>User List</h1>
      </header>
      
      <section className="user-list">
        <UserListAll/>
      </section>

    </div>
  );
};

export default Home;

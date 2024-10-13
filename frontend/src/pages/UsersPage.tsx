import React from 'react';
import UserListAll from '../components/User/UserListAll';
import '../styles/pages/UsersPage.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <Link to="/" style={{ textDecoration: 'none', textAlign: 'center'}}><h1>Library Management System</h1></Link>
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

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h3 className="not-found-message">Page Not Found!</h3>
      <p className="not-found-description">
        We looked everywhere for this page.
      </p>
      <Link to="/" className="not-found-link">
        Go To Home
      </Link>
    </div>
  );
};

export default NotFound;
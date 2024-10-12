import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Books from './pages/BooksPage';
import Users from './pages/UsersPage';
import BookDetail from './pages/BookDetailPage';
import UserDetail from './pages/UserDetailPage';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />               {/* Home Page */}
        <Route path="/books" element={<Books />} />         {/* Books List */}
        <Route path="/books/:id" element={<BookDetail />} />{/* Book Detail Page */}
        <Route path="/users" element={<Users />} />         {/* Users List */}
        <Route path="/users/:id" element={<UserDetail />} />{/* User Detail Page */}
        <Route path="*" element={<NotFound />} />           {/* 404 Page */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;

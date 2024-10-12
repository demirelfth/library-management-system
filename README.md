# Library Management System

A simple library management system that allows library staff to manage users, books, and borrowing operations. This project is built using **React.js** for the frontend, **Node.js** with **Express.js** for the backend, and a relational database **PostgreSQL**. 


## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)


## Features

- Existing users should be listed in a grid. This grid will display all registered users.
- When a user is selected, the user’s detail page should be accessible. This page will display:
  - Books currently borrowed by the user
  - Books previously borrowed by the user along with the ratings they provided
- On the user’s detail page, there should be an option to return a book currently in the user’s possession.
- Existing books should be listed in a grid. This grid will display all available books.
- When a book is selected, the book’s detail page should be accessible. This operation should be considered as a process much more frequent than others. This page will display:
  - Information related to the book (author, year etc)
  - Current owner, if there is
  - The average rating of the book
- From the book’s detail page, there should be an option to lend the book to a user.

## Technology Stack

- **Frontend**: React.js (TypeScript)
- **Backend**: Node.js, Express.js (REST API)
- **Database**: Relational (PostgreSQL)
- **ORM**: Sequelize
- **Version Control**: Git
- **Styling**: SCSS (Bonus), UI libraries like Bootstrap/Material UI
- **State Management**: Redux (Bonus)
  
## Installation

### Prerequisites
- Node.js (>= 14.x)
- PostgreSQL
- Git

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/demirelfth/library-management-system.git
    cd library-management-system
    ```

2. Install dependencies for both frontend and backend:

    ```bash
    # For the backend
    cd backend
    npm install --force

    # For the frontend
    cd frontend
    npm install --force
    ```

3. Set up the database:
    - Ensure you have PostgreSQL installed and running.
    - Create the database:
      ```bash
        cd backend/config
        node createDatabase.js
      ```
    - Create data for database:
      ```bash
        cd backend/config
        node init_db.js
      ```

4. Start the backend server:
    ```bash
    cd backend
    node app.js
    ```

5. Start the frontend application:
    ```bash
    cd frontend
    npm start
    ```

7. Open the app in your browser at `http://localhost:3200`.

## API Endpoints

| Method | Endpoint                  | Description                           |
|--------|---------------------------|---------------------------------------|
| `GET`  | `/users`                  | Get list of all users                 |
| `GET`  | `/users/2`                | Get details of a specific user        |
| `GET`  | `/books`                  | Get list of all books                 |
| `GET`  | `/books/2`                | Get details of a specific book        |
| `POST` | `/users/2/borrow/4`       | Borrow a book to a user               |
| `POST` | `/users/2/return/5`       | Return a borrowed book                |


## Usage

- **Borrow a Book**: Navigate to the list of books, select a book, and borrow it to a user.
- **Return a Book**: Go to the user's details page and return a currently borrowed book.

## Folder Structure

```bash
library-management-system/
│
├── backend/               # Backend codebase (Express.js, API)
│   ├── config/            # Configuration files for database connection and initialization
│   ├── controllers/       # Controller functions for handling request and responses
│   ├── models/            # ORM models for database schema (using Sequelize)
│   ├── routes/            # API route definitions and endpoint handlers
│   └── app.js             # Main application entry point and server setup
│
├── frontend/              # Frontend codebase (React.js)
│   ├── src/               # Main source code
│       ├── api/           # API request and service-related functions
│       ├── components/    # Reusable UI components and elements
│       ├── pages/         # Individual pages in the application
│       └── styles/        # Global and component-specific styling (SCSS)
│   ├── public/            # Static files and public assets
│   └── App component      # Main application component (entry point of the app)
│
└── README.md              # Project instructions
```


## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/demirelfth/library-management-system?tab=MIT-1-ov-file) file for details.
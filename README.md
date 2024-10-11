# Library Management System

A simple library management system that allows library staff to manage users, books, and borrowing operations. This project is built using **React.js** for the frontend, **Node.js** with **Express.js** for the backend, and a relational database **PostgreSQL**. 


## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Known Issues](#known-issues)
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
- PostgreSQL or any other relational database
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
    cd ../frontend
    npm install
    ```

3. Set up the database:
    - Ensure you have PostgreSQL installed and running.
    - Create the database:
      ```sql
      CREATE DATABASE library_management_system;
      ```
    - Apply the DDL script to create the necessary tables (found in `backend/database/ddl.sql`).

4. Set up environment variables:
    - Create a `.env` file in the `backend` directory with the following variables:
      ```
      DATABASE_URL=postgresql://username:password@localhost:5432/library_management_system
      ```

5. Start the backend server:
    ```bash
    cd backend
    npm run dev
    ```

6. Start the frontend application:
    ```bash
    cd ../frontend
    npm start
    ```

7. Open the app in your browser at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint                  | Description                           |
|--------|---------------------------|---------------------------------------|
| `GET`  | `/users`                  | Get list of all users                 |
| `GET`  | `/users/2`                | Get details of a specific user        |
| `GET`  | `/books`                  | Get list of all books                 |
| `GET`  | `/books/2`                | Get details of a specific book        |
| `POST` | `/users/2/borrow/4`       | Borrow a book to a user               |
| `POST` | `/users/2/return/5`       | Return a borrowed book                |

For more details, refer to the [Postman collection](./path-to-postman-collection).

## Usage

- **Borrow a Book**: Navigate to the list of books, select a book, and borrow it to a user.
- **Return a Book**: Go to the user's details page and return a currently borrowed book.

## Folder Structure

```bash
library-management-system/
│
├── backend/               # Backend code (Express.js API)
│   ├── src/               # Main source code
│   ├── database/          # DDL script for database creation
│   └── .env.example       # Sample environment file
│
├── frontend/              # Frontend code (React.js)
│   ├── src/               # Main source code
│   ├── public/            # Public assets
│   └── .env.example       # Sample environment file
│
└── README.md              # Project instructions
```

## Known Issues
- **Authentication**: There is no authentication or authorization mechanism in place. The application assumes all operations are performed by authorized staff.
- **Error Handling**: Ensure comprehensive error handling for common cases like:
    - Book already borrowed
    - Book return attempts when no book is borrowed
    - Database connection failures
- **UI Improvements**: Future improvements could include better pagination for larger lists of users and books.


## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/demirelfth/library-management-system?tab=MIT-1-ov-file) file for details.
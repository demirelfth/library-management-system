const API_URL = 'http://localhost:3000';

export const fetchBorrowedBooks = async (id: number) => {
  const response = await fetch(`${API_URL}/borrowed/user/${id}`);
  if (!response.ok) {
    throw new Error('Error with getting borrowed books');
  }
  return await response.json();
};

export const returnBorrowedBook = async (userId: number, returnBookId: number, score:number) => {
  if (returnBookId) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/return/${returnBookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score }),
      });

      if (!response.ok) {
        throw new Error('Error returning the book');
      }

      alert('Book returned successfully!');
    } catch (error) {
      console.error('Error returning book:', error);
      alert('An error occurred while returning the book. Please try again.');
    }
  }

  const response = await fetch(`${API_URL}/borrowed/user/${userId}`);
  if (!response.ok) {
    throw new Error('Error with getting borrowed books');
  }
  return await response.json();
};
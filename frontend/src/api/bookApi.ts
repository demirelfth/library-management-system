const API_URL = 'http://localhost:3000';

export const fetchBooks = async () => {
  const response = await fetch(`${API_URL}/books`);
  if (!response.ok) {
    throw new Error('Error with getting books');
  }
  return await response.json();
};

export const fetchBookById = async (id: number) => {
  const response = await fetch(`${API_URL}/books/${id}`);
  if (!response.ok) {
    throw new Error(`Error with getting book with id ${id}`);
  }
  return await response.json();
};
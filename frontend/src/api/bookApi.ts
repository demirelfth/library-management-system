const API_URL = 'http://localhost:3000';

export const fetchBooks = async () => {
  const response = await fetch(`${API_URL}/books`);
  if (!response.ok) {
    throw new Error('Error with getting books');
  }
  return await response.json();
};
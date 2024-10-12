const API_URL = 'http://localhost:3000';

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Error with getting users');
  }
  return await response.json();
};
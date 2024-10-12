const API_URL = 'http://localhost:3000';

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Error with getting users');
  }
  return await response.json();
};

export const fetchUserById = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Error with getting user with id ${id}`);
  }
  return await response.json();
};
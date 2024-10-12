import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../api/userApi';
import Loader from '../../components/Common/Loader';
import { Link } from 'react-router-dom';

// User Interface
interface User {
    id: number;
    name: string;
    email: string;
}

const HomeUserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const getUsers = async () => {
        try {
          const userData = await fetchUsers();
          setUsers(userData);
        } catch (err:unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occured');
            }
        } finally {
          setLoading(false);
        }
      };
      getUsers();
    }, []);
  
    if (loading) return <Loader/>
    if (error) return <p>{error}</p>;
  
    return (
      <div className='user-list'>
        <Link to="/users" style={{ textDecoration: 'none', color: '#000' }}><h2>User List</h2></Link>
        <ul>
          {users.slice(0, 5).map((user) => (
            <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: '#000' }}>
              <li>
                    {user.name} (<span style={{ fontSize: '0.8em', color: '#666' }}>{user.email.toLowerCase()}</span>)
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
};
  
export default HomeUserList;
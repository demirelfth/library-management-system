import React, { useEffect, useState } from 'react';
import { fetchUserById  } from '../../api/userApi';
import Loader from '../../components/Common/Loader';
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
}

const UserDetail = () => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams<{ id: string }>();
  
    useEffect(() => {
      const getUser = async () => {
        try {
            if (id) {
                const userData = await fetchUserById(parseInt(id));
                setUser(userData);
            }
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
      getUser();
    }, [id]);
  
    if (loading) return <Loader/>
    if (error) return <p>{error}</p>;
    if (!user) return <p>No user found</p>;
  
    return (
        <div>
            <Link to="/" style={{ textDecoration: 'none', textAlign: 'center'}}><h1>Library Management System</h1></Link>
            <header className="header">
                <h2>User Details</h2>
            </header>
            <section className="user-details">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </section>
        </div>
    );
};
  
export default UserDetail;
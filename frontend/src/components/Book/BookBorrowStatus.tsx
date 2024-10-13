import React, { useEffect, useState } from 'react';
import { fetchBorrowedBookStatus, borrowBook } from '../../api/borrowApi';
import { fetchUsers } from '../../api/userApi';
import Loader from '../../components/Common/Loader';
import { useParams } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
}

interface BorrowedResponse {
    message: string;
    borrowedBy?: User;
    averageRating?: string;
}

interface BookBorrowStatusProps {
    setRating: (rating: string | null) => void;  // setRating prop'u eklendi
}

const BorrowedBookStatus: React.FC<BookBorrowStatusProps> = ({ setRating }) => {
    const [data, setData] = useState<BorrowedResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [users, setUsers] = useState<User[]>([]); // Kullanıcılar için state
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // Seçilen kullanıcı ID
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchData = async () => {
            let result;
            try {
                // Ödünç alınan kitap durumunu al
                if (id) {
                    result = await fetchBorrowedBookStatus(parseInt(id));
                    setData(result);
                    setRating(result?.averageRating || null);  // Rating'i set ediyoruz
                }

                // Kullanıcıları al
                const usersResult = await fetchUsers();
                setUsers(usersResult);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, setRating]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return (
            <div className="no-data">
                <h2>Not Found</h2>
            </div>
        );
    }

    const handleButtonClick = async (userId: number) => {
        try {
            if (id) {
                const result = await borrowBook(parseInt(id), userId);
                setData(result);
                setRating(result?.averageRating || null);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred');
            }
        }
    };

    return (
        <div>
            <h2>Book Status</h2>

            {data.borrowedBy ? (
                <div>
                    <p><strong>Status:</strong> The book is currently borrowed by an user.</p>
                    <p><strong>Name:</strong> {data.borrowedBy.name}</p>
                    <p><strong>Email:</strong> {data.borrowedBy.email}</p>  
                </div>
            ) : (
                <div>
                    <p><strong>Status:</strong> The book is available to borrow.</p>
                    
                    <select 
                        className="custom-select"
                        onChange={(e) => setSelectedUserId(Number(e.target.value))} 
                        value={selectedUserId ?? ''}
                    >
                        <option value="" disabled>Select a user</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>

                    <button 
                        onClick={() => selectedUserId && handleButtonClick(selectedUserId)} 
                        className='borrow-button' 
                        disabled={!selectedUserId}
                    >
                        Borrow Book
                    </button>
                </div>
            )}
        </div>
    );
};

export default BorrowedBookStatus;

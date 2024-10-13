import React, { useEffect, useState } from 'react';
import { fetchBorrowedBookStatus, borrowBook } from '../../api/borrowApi';
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
    const { id } = useParams<{ id: string }>();
    let user_id = 1;

    useEffect(() => {
        const fetchData = async () => {
            let result;
            try {
                if (id) {
                    result = await fetchBorrowedBookStatus(parseInt(id));
                    setData(result);
                    setRating(result?.averageRating || null);  // Rating'i set ediyoruz
                }
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

    const handleButtonClick = (userId: number) => {
        const borrowBookAsync = async () => {
            try {
                if (id) {
                    const result = await borrowBook(parseInt(id), userId);
                    setData(result);
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An error occurred');
                }
            }
        };

        borrowBookAsync();
    };

    return (
        <div>
            <h2>Book Status</h2>

            {data.borrowedBy ? (
                <div>
                    <p><strong>Status:</strong> The book is currently borrowed by an user.</p>
                    <p><strong>Name:</strong> {data.borrowedBy.name}</p>
                    <p><strong>Email:</strong> {data.borrowedBy.email}</p>  
                    {/* <p><strong>Rating:</strong> {data.averageRating}</p> */}
                </div>
            ) : (
                <div>
                    <p><strong>Status:</strong> The book is available to borrow.</p>
                    <button onClick={() => handleButtonClick(user_id)} className='borrow-button'>Borrow Book</button>
                </div>
            )}
        </div>
    );
};

export default BorrowedBookStatus;

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';

const ProtectedLoginRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (loading && user) 
        {
            router.push('/dashboard');
        }
    }, [loading, user, router]);

    if (loading || user) {
        return <p>Loading...</p>;
    }

    return children;
};

export default ProtectedLoginRoute;

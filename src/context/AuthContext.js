import { createContext, useState, useEffect } from 'react';
import axios from '../utils/axios';  // Import the configured Axios instance
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token) 
        {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('/user')
                .then(response => {
                    setUser(response.data);
                    console.log(response,"Check Api");
                    setLoading(false);
                    // router.push('/dashboard');
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setLoading(false);
                });
        } 
        else 
        {
            setLoading(false);
        }
    }, []);

    const register = async (name, email, password, password_confirmation) => {
        const response = await axios.post('/register', { name, email, password, password_confirmation });
        console.log(response,"Check Api");
        const token = response.data.authorisation;
        // const token = response.data.authorisation.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(response.data.user);
        router.push('/dashboard');
    };

    const login = async (email, password) => {
        const response = await axios.post('/login', { email, password });
        const token = response.data.authorisation;
        // const token = response.data.authorisation.token;
        console.log(token,"Check Api");
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
        setUser(response.data.user);
        router.push('/dashboard');
    };

    const logout = async () => {
        try 
        {
            // Make logout request without the authorization header
            const response = await axios.post('/logout', null, {
                headers: { Authorization: undefined }
            });
            console.log(response, "Check Logout Api");
            localStorage.removeItem('token');
            setUser(null);
            router.push('/');
        }
        catch (error) 
        {
            // Handle error
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

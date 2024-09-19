// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { findUserByEmail } from '../services/authService';

// Export AuthContext to use it in other parts of the application
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setCurrentUser(parsedUser);
            } catch (error) {
                console.error('Error parsing currentUser:', error);
                localStorage.removeItem('currentUser');
            }
        }
    }, []);

    const login = async (email, password) => {
        try {
            await loginUser(email, password);
            const responce1 = await findUserByEmail(email);
            const user = responce1.data;
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook to use Auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

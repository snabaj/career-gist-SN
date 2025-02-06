import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/types'; // Ensure this import points to where your User type is defined

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        setLoading(true);
        try {
            // Simulate an API call
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error(`Login failed with status: ${response.status}`);
            }

            const userData: User = await response.json();
            setUser(userData);
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(`Login failed: ${error.message}`);
            } else {
                setError('Login failed: An unknown error occurred');
            }
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);  // Clear user data on logout
        setError(null);  // Reset any errors
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;

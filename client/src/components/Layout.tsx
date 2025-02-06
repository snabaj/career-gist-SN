import React, { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook
import '../index.css'; // Ensure the path to your CSS file is correct

interface Props {
    children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    const { user, logout } = useAuth(); // Access authentication context
    const navigate = useNavigate();
    const location = useLocation().pathname;

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to home page after logout
    };

    return (
        <div>
            <header>
                <nav>
                    <ul className="navbar">
                        <li className={location === '/' ? 'active' : ''}><Link to="/">Home</Link></li>
                        {user && ( // Show these links only if the user is logged in
                            <>
                                <li className={location === '/saved-jobs' ? 'active' : ''}><Link to="/saved-jobs">Saved Jobs</Link></li>
                                <li className={location === '/applied-to' ? 'active' : ''}><Link to="/applied-to">Applied To</Link></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </>
                        )}
                        {!user && ( // Show these links only if the user is not logged in
                            <>
                                <li className={location === '/login' ? 'active' : ''}><Link to="/login">Login</Link></li>
                                <li className={location === '/signup' ? 'active' : ''}><Link to="/signup">Signup</Link></li>
                            </>
                        )}
                        <li className={location === '/privacy-policy' ? 'active' : ''}><Link to="/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;

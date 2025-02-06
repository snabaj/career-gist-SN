// Navbar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';

interface NavbarProps {
    isLoggedIn: boolean;  // Prop to check if user is logged in
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
    const location = useLocation().pathname;

    return (
        <ul className="navbar navbar-tabs">
            <li>
                <Link to="/" className={location === '/' ? 'active' : ''}>Home</Link>
            </li>
            {isLoggedIn && (
                <>
                    <li>
                        <Link to="/saved-jobs" className={location === '/saved-jobs' ? 'active' : ''}>Saved Jobs</Link>
                    </li>
                    <li>
                        <Link to="/applied-to" className={location === '/applied-to' ? 'active' : ''}>Applied To</Link>
                    </li>
                    <li>
                        <button onClick={() => { /* Logic to handle logout */ }}>Logout</button>
                    </li>
                </>
            )}
            {!isLoggedIn && (
                <>
                    <li>
                        <Link to="/login" className={location === '/login' ? 'active' : ''}>Login</Link>
                    </li>
                    <li>
                        <Link to="/signup" className={location === '/signup' ? 'active' : ''}>Sign Up</Link>
                    </li>
                </>
            )}
            <li>
                <Link to="/privacy-policy" className={location === '/privacy-policy' ? 'active' : ''}>Privacy Policy</Link>
            </li>
        </ul>
    );
};

export default Navbar;

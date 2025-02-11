import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';
import '../App.css';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation().pathname;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="navbar-toggle" onClick={toggleMenu}>
        Menu
      </div>
      <ul className={`navbar navbar-tabs ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" className={location === '/' ? 'active' : ''}>Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/saved-jobs" className={location === '/saved-jobs' ? 'active' : ''}>Saved Jobs</Link>
            </li>
            <li>
              <Link to="/applied-to" className={location === '/applied-to' ? 'active' : ''}>Applied To</Link>
            </li>
            <li>
              <button className="Logout-button" onClick={onLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={location === '/login' ? 'active' : ''}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default Navbar;

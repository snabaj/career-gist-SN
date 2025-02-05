import { Link, useLocation } from 'react-router-dom';
import '../index.css';

function Navbar() {
    const location = useLocation().pathname;

    return (
        <>
            <ul className="navbar navbar-tabs">
                <li>
                    <Link to="/" className={location === '/' ? 'active' : ''}>Home</Link>
                </li>
                <li>
                    <Link to="/saved-jobs" className={location === '/saved-jobs' ? 'active' : ''}>Saved Jobs</Link>
                </li>
                <li>
                    <Link to="/applied-to" className={location === '/applied-to' ? 'active' : ''}>Applied To</Link>
                </li>
                <li>
                    <Link to="/privacy-policy" className={location === '/privacy-policy' ? 'active' : ''}>Privacy Policy</Link>
                </li>
                {/* Uncomment and correct other paths as necessary */}
                {/* <li>
                    <Link to="/logout" className={location === '/logout' ? 'active' : ''}>Logout</Link>
                </li>
                <li>
                    <Link to="/login" className={location === '/login' ? 'active' : ''}>Login</Link>
                </li>
                <li>
                    <Link to="/signup" className={location === '/signup' ? 'active' : ''}>Signup</Link>
                </li> */}
            </ul>
        </>
    );
}

export default Navbar;

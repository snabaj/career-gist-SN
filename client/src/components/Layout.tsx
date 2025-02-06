import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';

interface Props {
    children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    const location = useLocation().pathname;

    return (
        <div>
            <header>
                <nav>
                    <ul className="navbar">
                        <li className={location === '/' ? 'active' : ''}><Link to="/">Home</Link></li>
                        <li className={location === '/saved-jobs' ? 'active' : ''}><Link to="/saved-jobs">Saved Jobs</Link></li>
                        <li className={location === '/applied-to' ? 'active' : ''}><Link to="/applied-to">Applied To</Link></li>
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
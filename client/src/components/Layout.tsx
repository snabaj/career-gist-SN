import React, { ReactNode } from 'react';
import Navbar from './Navbar'; // Import Navbar component
import '../index.css';

interface LayoutProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn, onLogout, children }) => {
  return (
    <div>
      <header>
        <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;

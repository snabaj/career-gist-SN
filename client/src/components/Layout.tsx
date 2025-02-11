import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from '../Pages/Footer'; // Import the Footer component
import '../App.css';

interface LayoutProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn, onLogout, children }) => {
  return (
    <div className="layout-container"> {/* Ensure this class is styled appropriately */}
      <header>
        <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      </header>
      <main className="main-content">{children}</main> {/* Main content area */}
      <Footer />
    </div>
  );
};

export default Layout;

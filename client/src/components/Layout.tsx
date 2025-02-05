// src/components/Layout.tsx
import React, { PropsWithChildren } from 'react';
import Navbar from './Navbar';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;

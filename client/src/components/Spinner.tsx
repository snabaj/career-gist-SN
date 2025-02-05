import React from 'react';
import './Spinner.css';  // Ensure your CSS file is correctly linked

const Spinner: React.FC = () => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;

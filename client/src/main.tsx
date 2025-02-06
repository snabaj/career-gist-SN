import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { JobsProvider } from './contexts/JobsContext';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
    <React.StrictMode>
        <JobsProvider>
            <App />
        </JobsProvider>
    </React.StrictMode>
);

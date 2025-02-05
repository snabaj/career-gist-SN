import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { JobsProvider } from './contexts/JobsContext';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <JobsProvider>
                <App />
            </JobsProvider>
        </BrowserRouter>
    </React.StrictMode>
);

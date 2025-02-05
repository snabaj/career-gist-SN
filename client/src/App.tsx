// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './Pages/HomePage';
import SavedJobs from './Pages/SavedJobs';
import AppliedToPage from './Pages/AppliedToPage';

const App: React.FC = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />
                <Route path="/applied-to" element={<AppliedToPage />} />
            </Routes>
        </Layout>
    );
};

export default App;

// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './Pages/HomePage';
import SavedJobs from './Pages/SavedJobs';

const App: React.FC = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />
                {/* Other routes can also be wrapped in Layout as necessary */}
            </Routes>
        </Layout>
    );
};

export default App;

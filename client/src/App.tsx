import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './Pages/HomePage';
import SavedJobs from './Pages/SavedJobs';
import AppliedToPage from './Pages/AppliedToPage';
import { JobsProvider } from './contexts/JobsContext';

const App: React.FC = () => {
    return (
        <JobsProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/saved-jobs" element={<SavedJobs />} />
                        <Route path="/applied-to" element={<AppliedToPage />} />
                    </Routes>
                </Layout>
            </Router>
        </JobsProvider>
    );
};

export default App;
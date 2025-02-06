import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './Pages/HomePage';
import SavedJobs from './Pages/SavedJobs';
import AppliedToPage from './Pages/AppliedToPage';
import LoginPage from './Pages/Login';
import SignupPage from './Pages/Signup';
import { AuthProvider } from './contexts/AuthContext'; // Make sure this is imported correctly

const App: React.FC = () => {
    return (
        <Router> {/* Only one Router should be used */}
            <AuthProvider> {/* AuthProvider should not include another Router */}
                <Layout> {/* Layout component should not include a Router */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/saved-jobs" element={<SavedJobs />} />
                        <Route path="/applied-to" element={<AppliedToPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        {/* Additional routes can be added here */}
                    </Routes>
                </Layout>
            </AuthProvider>
        </Router>
    );
};

export default App;

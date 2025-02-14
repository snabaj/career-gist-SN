import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './Pages/HomePage';
import SavedJobs from './Pages/SavedJobs';
import AppliedToPage from './Pages/AppliedToPage';
import Login from './Pages/Login';
import Footer from './Pages/Footer';


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset the login state
    alert('You have successfully logged out.');
  };

  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/saved-jobs" element={<SavedJobs isLoggedIn={isLoggedIn} />} />
          <Route path="/applied-to" element={<AppliedToPage />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

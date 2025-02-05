import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Uncomment or add other routes as necessary */}
      {/* <Route path="/saved-jobs" element={<SavedJobsPage />} />
      <Route path="/applied-jobs" element={<AppliedJobsPage />} /> */}
    </Routes>
  );
};

export default App;

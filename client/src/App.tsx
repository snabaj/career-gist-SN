import React from 'react';  // Ensure React is imported
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';  // Import the HomePage component

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/saved-jobs" element={<SavedJobsPage />} />
        <Route path="/applied-jobs" element={<AppliedJobsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Error from './pages/Error.js';
import HomePage from './pages/HomePage.js';
import SavedJobs from './pages/SavedJobs.js';
import AppliedTo from './pages/AppliedTo.js';
import SignUp from './pages/SignUp.js';
import LogIn from './pages/LogIn.js';
import Footer from './pages/Footer.js';

// Get the root element
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Create the root
const root = createRoot(rootElement);

// Render the application within the StrictMode and BrowserRouter
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="SavedJobs" element={<SavedJobs />} />
          <Route path="AppliedTo" element={<AppliedTo />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="LogIn" element={<LogIn />} />
          <Route path="Footer" element={<Footer />} />
          {/* Handling Error or Not Found Cases */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);


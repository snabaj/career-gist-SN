//Dummy API Function to Simulate Job Listings
import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import JobList from '../components/JobList';
import Spinner from '../components/Spinner';
import { Job } from '../types/types';
import fetchDummyJobs from '../types/types/fetchDummyJobs'; // Ensure correct import path
import '../App.css';
import './HomePage.css';
import logo from '../assets/CareerGist.png';

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle Search Using Dummy API
  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching dummy jobs for:", query);
      const data = await fetchDummyJobs(); // Fetch from Dummy API
      setJobs(data);
    } catch (error) {
      console.error("Failed to load jobs:", error);
      setError("Unable to fetch jobs. Please try again later.");
    }
    setLoading(false);
  };

  const handleSaveJob = async (job: Job) => {
    alert(`Job saved: ${job.title} at ${job.company}`); // Simulated Save
  };

  return (
    <div>
      <img className="logo" src={logo} alt="Career Gist Logo" />
      <h1 className="homepage-h1">Welcome to Career Gist</h1>
      <h2 className="homepage-h2">Because Searching for Jobs Should be Easy</h2>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}
   
      {jobs.length > 0 ? (
        <JobList jobs={jobs} onSave={handleSaveJob} />
      ) : (
        !loading && <p>No results found.</p>
      )}
    </div>
  );
};

export default HomePage;


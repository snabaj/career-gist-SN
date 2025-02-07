import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';  // Ensure the path is correct
import JobList from '../components/JobList';
import Spinner from '../components/Spinner';
import { Job } from '../types/types';
import '../App.css';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://example.com/api/jobs?query=${query}`);
      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      console.error('Failed to load jobs:', error);
      setError('Unable to fetch jobs. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h1 className="homepage-h1">Welcome to Career Gist</h1>
      <h2 className="homepage-h2">Because Searching for Jobs Should be Easy</h2>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}

      {jobs.length > 0 ? (
        <JobList
          jobs={jobs}
          onSave={() => {}}
          onRemove={() => {}}
          onUpdateStatus={() => {}}
        />
      ) : (
        !loading && <p>No results found.</p>
      )}
    </div>
  );
};

export default HomePage;

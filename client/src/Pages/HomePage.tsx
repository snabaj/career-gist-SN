import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import JobList from '../components/JobList';
import Spinner from '../components/Spinner';
import { Job } from '../types/types';
import '../App.css';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://example.com/api/jobs?page=${page}&query=${query}`);
        const data = await response.json();
        setJobs(prevJobs => page === 0 ? data.jobs : [...prevJobs, ...data.jobs]);
      } catch (error) {
        console.error('Failed to load jobs:', error);
        setError('Unable to fetch jobs. Please try again later.');
      }
      setLoading(false);
    };

    if (query !== '') {
      fetchJobs();
    }
  }, [query, page]);

  const handleSearch = () => {
    const newSearch = query.trim();
    if (!searchHistory.includes(newSearch)) {
      setSearchHistory(prevHistory => [...prevHistory, newSearch]);
    }
    setPage(0);
    setShowHistory(false);
  };

  const toggleSearchHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div>
      <h1 className="homepage-h1">Welcome to Career Gist</h1>
      <h2 className="homepage-h2">Because Searching for Jobs Should be Easy</h2>
      <SearchForm query={query} onQueryChange={setQuery} onSearch={handleSearch} loading={loading} />
      <button className="searchform-button" onClick={toggleSearchHistory}>Toggle Search History</button>
      {showHistory && (
        <div>
          <h3>Search History</h3>
          <ul>
            {searchHistory.map((history, index) => (
              <li key={index}>{history}</li>
            ))}
          </ul>
        </div>
      )}
      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}
      {jobs.length > 0 ? (
        <JobList jobs={jobs} onSave={() => {}} onShare={() => {}} onRemove={() => {}} onUpdateStatus={() => {}} />
      ) : (
        !loading && <p>No results found.</p>
      )}
    </div>
  );
};

export default HomePage;

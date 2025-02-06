// HomePage.tsx
import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';  // Adjust path as necessary
import JobList from '../components/JobList';  // Adjust path as necessary
import Spinner from '../components/Spinner';  // Ensure Spinner is imported
import { Job } from '../types/types';  // Adjust path as necessary
import '../App.css';  // Ensure CSS is correctly linked
import './HomePage.css';  // Ensure CSS is correctly linked

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const response = await fetch(`https://example.com/api/jobs?page=${page}&query=${query}&location=${location}`);
        const data = await response.json();
        setHasMore(data.hasMore);
        setJobs(prevJobs => page === 0 ? data.jobs : [...prevJobs, ...data.jobs]);
      } catch (error) {
        console.error('Failed to load jobs:', error);
        setError('Unable to fetch jobs. Please try again later.');
      }
      setLoading(false);
    };

    if (query !== '' || location !== '') {
      fetchJobs();
    }
  }, [query, location, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      if (hasMore) setPage(prevPage => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const handleSearch = () => {
    const newSearch = `${query.trim()} in ${location.trim()}`;
    if (!searchHistory.includes(newSearch)) {
      setSearchHistory(prevHistory => [...prevHistory, newSearch]);
    }
    setPage(0);
    setShowHistory(false); // Hide search history when new search is initiated
  };

  const toggleSearchHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div>
      <h1 className="homepage-h1">Welcome to Career Gist</h1>
      <h2 className="homepage-h2">Because Searching for Jobs Should be Easy</h2>
      <SearchForm
        query={query}
        location={location}
        onQueryChange={setQuery}
        onLocationChange={setLocation}
        onSearch={handleSearch}
        loading={loading}
      />
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
        <JobList
          jobs={jobs}
          onSave={() => {}}
          onShare={() => {}}
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

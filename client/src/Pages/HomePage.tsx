import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import JobList from '../components/JobList';
import Spinner from '../components/Spinner';
import { Job } from '../types/types';
import '../App.css';

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://example.com/api/jobs?page=${page}&query=${query}&location=${location}`);
        const data = await response.json();
        setHasMore(data.hasMore);
        setJobs(prevJobs => page === 0 ? data.jobs : [...prevJobs, ...data.jobs]);
      } catch (error) {
        console.error('Failed to load jobs:', error);
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
      <h1>Career Gist</h1>
      <h2>Because Searching for Jobs Should be Easy</h2>
      <SearchForm
        query={query}
        location={location}
        onQueryChange={setQuery}
        onLocationChange={setLocation}
        onSearch={handleSearch}
        loading={loading}
      />
      <button onClick={toggleSearchHistory}>Toggle Search History</button>
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
      {jobs.length > 0 ? (
        <JobList jobs={jobs} listType="searchResults" />
      ) : (
        !loading && <p>No results found.</p>
      )}
    </div>
  );
};

export default HomePage;

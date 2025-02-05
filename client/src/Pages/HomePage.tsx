import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';  // Ensure correct path
import JobList from '../components/JobList';       // Ensure correct path
import Spinner from '../components/Spinner';       // Ensure correct path
import { Job } from '../types/types';              // Ensure correct path
import '../App.css';

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);  // Assuming API uses 0-based indexing for pages
  const [query, setQuery] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Update the API endpoint as necessary
        const response = await fetch(`https://example.com/api/jobs?page=${page}&query=${query}&location=${location}`);
        const data = await response.json();
        setHasMore(data.hasMore);  // Assume API returns a hasMore flag
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
    setPage(0);  // Reset to the first page
    // No need to call fetchJobs directly here since useEffect will react to changes in 'page', 'query', or 'location'
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

import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import JobList from '../components/JobList';
import Spinner from '../components/Spinner';
import logo from '../assets/CareerGist.png';
import type { JobDetails, JobSearchResponse } from "../types/interface/jobSearch";
import '../App.css';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // ✅ Track login state

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsLoggedIn(true);
      }
    };
    checkAuth();
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/jsearch/query?query=${encodeURIComponent(query)}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data: JobSearchResponse = await response.json();
      setJobs(data.data.data); // strictly following API response structure
    } catch (error) {
      console.error("Failed to load jobs:", error);
      setError("Unable to fetch jobs. Please try again later.");
    }
    setLoading(false);
  };

//   const handleSearch = async (query: string) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`/api/jsearch/query?query=${encodeURIComponent(query)}`, {
//         method: "GET", 
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
//       }

//       const data: JobSearchResponse = await response.json();
//       setJobs(data.data.data); //strictly following API response structure
//       // ((jobDetails: JobDetails) => ({
//       //   id: jobDetails.job_id,
//       //   title: jobDetails.job_title,
//       //   publisher: jobDetails.job_publisher,
//       //   company: jobDetails.employer_name,
//       //   location: jobDetails.job_location,
//       //   description: jobDetails.job_description,
//       //   type: jobDetails.job_employment_type,
//       //   url: jobDetails.job_apply_link,
//       //   highlights: jobDetails.job_highlights,
//       //   isRemote: jobDetails.job_is_remote,
//       //   postedAt: jobDetails.job_posted_at,
//       //   city: jobDetails.job_city,
//       //   state: jobDetails.job_state,
//       //   country: jobDetails.job_country,
//       //   qualifications: jobDetails.job_highlights?.Qualifications,
//       //   benefits: jobDetails.job_highlights?.Benefits,
//       //   responsibilities: jobDetails.job_highlights?.Responsibilities,
//       // })));

  const handleSaveJob = async (job: JobDetails) => {
    if (!isLoggedIn) return alert('Please log in to save jobs.');
    try {
      const response = await fetch('/api/save-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        throw new Error(`Failed to save job: ${response.statusText}`);
      }

      alert(`Job saved: ${job.job_title} at ${job.employer_name}`);
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Error saving job. Try again later.');
    }
  };

  const handleMarkAsApplied = async (job_id: string) => {
    try {
      const response = await fetch(`/api/mark-as-applied/${job_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Failed to mark job as applied: ${response.statusText}`);
      }

      alert(`Marked job ${job_id} as applied!`);
    } catch (error) {
      console.error('Error marking job as applied:', error);
      alert('Error marking job as applied. Try again later.');
    }
  };

  const handleRemoveJob = async (job_id: string) => {
    try {
      const response = await fetch(`/api/remove-job/${job_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to remove job: ${response.statusText}`);
      }

      alert(`Removed job ${job_id} from saved jobs.`);
    } catch (error) {
      console.error('Error removing job:', error);
      alert('Error removing job. Try again later.');
    }
  };

  return (
    <div>
      <img className="logo" src={logo} alt="CareerGist Logo" />
      <h1 className="homepage-h1">Welcome to CareerGist</h1>
      <h2 className="homepage-h2">Because Searching for Jobs Should be Easy.</h2>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}

      {jobs.length > 0 ? (
        <JobList
          jobs={jobs}
          onSave={handleSaveJob}
          onMarkAsApplied={handleMarkAsApplied}
          onRemove={handleRemoveJob}
          isLoggedIn={isLoggedIn} // ✅ Pass login state to JobList
        />
      ) : (
        !loading && <p>No results found.</p>
      )}
    </div>
  );
};

export default HomePage;


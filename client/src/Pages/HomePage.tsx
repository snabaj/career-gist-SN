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
      console.log("🚀 API Response:", data);

      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        console.log("✅ Setting job data:", data.data);
        setJobs(data.data);
      } else {
        console.warn("⚠️ No enhanced data. Checking for raw job data...");
        setJobs([]);
      }
    } catch (error) {
      console.error("❌ Failed to load jobs:", error);
    } finally {
      setLoading(false);
    } try {
      const response = await fetch(`/api/jsearch/query?query=${encodeURIComponent(query)}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data: JobSearchResponse = await response.json();
      console.log("🚀 API Response:", data);

  if (Array.isArray(data.data)) {
    // Transform the data to match the JobDetails type
    const transformedJobs: JobDetails[] = data.data.map((jobDetails: JobDetails) => ({
      job_id: jobDetails.job_id,
      job_title: jobDetails.job_title,
      employer_name: jobDetails.employer_name,
      job_publisher: jobDetails.job_publisher,
      job_location: jobDetails.job_location,
      job_description: jobDetails.job_description,
      job_employment_type: jobDetails.job_employment_type,
      job_apply_link: jobDetails.job_apply_link,
      job_highlights: jobDetails.job_highlights,
      job_is_remote: jobDetails.job_is_remote,
      job_posted_at: jobDetails.job_posted_at,
      job_city: jobDetails?.job_city,
      job_state: jobDetails?.job_state,
      job_country: jobDetails?.job_country,
    }));
    console.log("Transformed Jobs:", transformedJobs);

    setJobs(transformedJobs); // strictly following API response structure
  } else {
    throw new Error("Unexpected response format");
  }
} catch (error) {
  console.error("Error fetching jobs:", error);
}
setLoading(false);
};

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
    <div className="header-container">
      <img className="logo" src={logo} alt="CareerGist Logo" />
      <h1 className="homepage-h1">Welcome to CareerGist</h1>
      <h2 className="homepage-h2">Because Searching for Jobs Should be Easy.</h2>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}

      {jobs?.length > 0 ? (
        <JobList
          jobs={jobs}
          onSave={handleSaveJob}
          onMarkAsApplied={handleMarkAsApplied}
          onRemove={handleRemoveJob}
          isLoggedIn={isLoggedIn} // ✅ Pass login state to JobList
        />
      ) : (
        !loading && <p>Not the job you're looking for? Try a different keyword or location.</p>
      )}
    </div>
  );
};

export default HomePage;
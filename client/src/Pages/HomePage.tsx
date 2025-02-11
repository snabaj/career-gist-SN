import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import JobList from '../components/JobList';
import Spinner from '../components/Spinner';
import '../App.css';
import './HomePage.css';
import logo from '../assets/CareerGist.png';
import type {JobDetails, JobSearchResponse, JobHighlights} from "../types/interface/jobSearch";

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

      const data : JobSearchResponse = await response.json();
      setJobs(data.data.data.map((jobDetails: JobDetails) => ({
        id: jobDetails.job_id,
        title: jobDetails.job_title,
        publisher: jobDetails.job_publisher,
        company: jobDetails.employer_name,
        location: jobDetails.job_location,
        description: jobDetails.job_description,
        type: jobDetails.job_employment_type,
        url: jobDetails.job_apply_link,
        highlights: jobDetails.job_highlights,
        isRemote: jobDetails.job_is_remote,
        postedAt: jobDetails.job_posted_at,
        city: jobDetails.job_city,
        state: jobDetails.job_state,
        country: jobDetails.job_country,
        qualifications: jobDetails.job_highlights?.Qualifications,
        benefits: jobDetails.job_highlights?.Benefits,
        responsibilities: jobDetails.job_highlights?.Responsibilities,
      })));

      // ✅ Transforms JobDetails[] into Job[]
      // Adjust according to API response structure
    } catch (error) {
      console.error("Failed to load jobs:", error);
      setError("Unable to fetch jobs. Please try again later.");
    }
    setLoading(false);
  };

  const handleSaveJob = async (job: Job) => {
    alert(`Job saved: ${job.title} at ${job.company}`);
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

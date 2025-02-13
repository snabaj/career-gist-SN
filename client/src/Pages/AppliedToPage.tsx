import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import type { JobDetails, JobSearchResponse } from "../types/interface/jobSearch";
import styles from './SavedJobs.module.css';

const AppliedToPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  //Should only run once when the component mounts
  //The empty dependency array ensures that the effect runs only once
  //Therefore, it does not re-run when the component updates
 // ✅ Persist login check to get applied jobs only when the user is authenticated
 useEffect(() => {
  const checkAuth = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  };
  checkAuth();
}, []);

useEffect(() => {
  if (!isLoggedIn) return; // ✅ Only fetch jobs if logged in

  const fetchAppliedJobs = async () => {
    try {
      const response = await fetch('/api/applied-jobs'); // 🔹 Adjust API endpoint
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data: JobSearchResponse = await response.json();
      setJobs(data.data.data); // ✅ Extracts applied jobs from response
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      setError('Could not load applied jobs.');
    }
    setLoading(false);
  };

  fetchAppliedJobs();
}, [isLoggedIn]); // ✅ Only run when login state changes


  return (
    <div className={styles.container}>
      <h1>Applied To Jobs</h1>
      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}
      {isLoggedIn ? (
        jobs.length > 0 ? (
          <ul className={styles.jobsList}>
            {jobs.map((job) => (
              <li key={job.job_id}>
                <h2 className={styles['job-title']}>{job.job_title} at {job.employer_name}</h2>
                <p className={styles['job-info']}>{job.job_location} - {job.job_employment_type}</p>
                <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
                  View Job
                </a>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>You have not applied to any jobs yet.</p>
        )
      ) : (
        <p>Please log in to view applied jobs.</p>
      )}
    </div>
  );
};

export default AppliedToPage;

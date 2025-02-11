import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import type {JobDetails, JobSearchResponse} from "../types/interface/jobSearch";
import styles from './SavedJobs.module.css';


const SavedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

//need to take out the dummy data and replace with the actual fetch call
useEffect(() => {
  const fetchSavedJobs = async () => {
    try {
      const response = await fetch('/api/saved-jobs'); // Adjust API endpoint
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data: JobSearchResponse = await response.json();
      setJobs(data.data.data); // ✅ Directly using JobDetails[] from API response
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      setError('Could not load saved jobs.');
    }
    setLoading(false);
  };

  fetchSavedJobs();
}, []);


  return (
    <div className={styles.container}>
      <h1>Saved Jobs</h1>
      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}
      {jobs.length > 0 ? (
        <ul className={styles.jobsList}>
          {jobs.map((job) => (
            <li key={job.job_id} className={styles.jobItem}>
              <h2 className={styles['job-title']}>{job.job_title} at {job.employer_name}</h2>
              <p className={styles['job-info']}>{job.job_location} - {job.job_employment_type}</p>
              <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
                View Job
              </a>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No jobs saved yet.</p>
      )}
    </div>
  );
};

export default SavedJobs;

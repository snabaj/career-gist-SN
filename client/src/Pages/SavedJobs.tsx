import React, { useEffect, useState, useCallback } from 'react';
import Spinner from '../components/Spinner';
import type {JobDetails, JobSearchResponse} from "../types/interface/jobSearch";
import styles from './SavedJobs.module.css';


interface SavedJobsProps {
  isLoggedIn: boolean; // ✅ Ensures job actions are only available if user is logged in
}

const SavedJobs: React.FC<SavedJobsProps> = ({ isLoggedIn }) => {
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

//need to take out the dummy data and replace with the actual fetch call
useEffect(() => {
  const fetchSavedJobs = async () => {
    try {
      const response = await fetch('/api/saved-jobs'); // ✅ Correct API endpoint
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data: JobSearchResponse = await response.json();
      setJobs(data.data.data); // ✅ Uses correct API response format
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      setError('Could not load saved jobs.');
    }
    setLoading(false);
  };

  fetchSavedJobs();
}, []);

// ✅ Remove job function with correct API endpoint
const handleRemoveJob = useCallback(async (job_id: string) => {
  try {
    const response = await fetch(`/api/remove-saved-job/${job_id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to remove job: ${response.statusText}`);
    }

    setJobs((prevJobs) => prevJobs.filter((job) => job.job_id !== job_id));
  } catch (error) {
    console.error('Error removing job:', error);
    setError('Could not remove job.');
  }
}, []);

// ✅ Mark as applied function with correct API endpoint
const handleMarkAsApplied = useCallback(async (job_id: string) => {
  try {
    const response = await fetch(`/api/mark-applied/${job_id}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to mark job as applied: ${response.statusText}`);
    }

    alert('Job marked as applied! ✅');
  } catch (error) {
    console.error('Error marking job as applied:', error);
    setError('Could not mark job as applied.');
  }
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
              {isLoggedIn && (
                <>
                  <button className={styles.button} onClick={() => handleMarkAsApplied(job.job_id)}>Mark as Applied</button>
                  <button className={styles.button} onClick={() => handleRemoveJob(job.job_id)}>Remove</button>
                </>
              )} 
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

//Dummy Data

import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Job } from '../types/types';
import styles from './SavedJobs.module.css';

// Dummy API function to simulate saved jobs
const fetchDummySavedJobs = async (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Software Engineer',
          company: 'Tech Corp',
          location: 'San Francisco, CA',
          type: 'Full-time',
          description: 'Develop and maintain software applications.',
          url: 'https://example.com/job1',
        },
        {
          id: '2',
          title: 'Frontend Developer',
          company: 'Creative Solutions',
          location: 'New York, NY',
          type: 'Contract',
          description: 'Design and implement user interfaces.',
          url: 'https://example.com/job2',
        },
      ]);
    }, 1000);
  });
};

const SavedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const data = await fetchDummySavedJobs(); // ✅ Fetch from dummy API
        setJobs(data);
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
            <li key={job.id} className={styles.jobItem}>
              <h2 className={styles['job-title']}>{job.title} at {job.company}</h2>
              <p className={styles['job-info']}>{job.location} - {job.type}</p>
              <a href={job.url} target="_blank" rel="noopener noreferrer">
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

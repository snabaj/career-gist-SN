//Dummy Data

import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Job } from '../types/types';
import styles from './SavedJobs.module.css';

// Dummy API function to simulate applied jobs
const fetchDummyAppliedJobs = async (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Backend Developer',
          company: 'Tech Innovators',
          location: 'Remote',
          type: 'Full-time',
          description: 'Develop APIs and manage backend services.',
          url: 'https://example.com/job1',
        },
        {
          id: '2',
          title: 'UI/UX Designer',
          company: 'Design Pro',
          location: 'Los Angeles, CA',
          type: 'Contract',
          description: 'Create intuitive user experiences and wireframes.',
          url: 'https://example.com/job2',
        },
      ]);
    }, 1000);
  });
};

const AppliedToPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const data = await fetchDummyAppliedJobs(); // ✅ Fetch from dummy API
        setJobs(data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        setError('Could not load applied jobs.');
      }
      setLoading(false);
    };
    fetchAppliedJobs();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Applied To Jobs</h1>
      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}
      {jobs.length > 0 ? (
        <ul className={styles.jobsList}>
          {jobs.map((job) => (
            <li key={job.id}>
              <h2 className={styles['job-title']}>{job.title} at {job.company}</h2>
              <p className={styles['job-info']}>{job.location} - {job.type}</p>
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                View Job
              </a>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>You have not applied to any jobs yet.</p>
      )}
    </div>
  );
};

export default AppliedToPage;

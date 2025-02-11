import React, { useState, useEffect } from 'react';
import { Job } from '../types/types';
import styles from './JobList.module.css';


interface JobListProps {
  onSave: (job: Job) => void;
  //add a jobs prop
}

const JobList: React.FC<JobListProps> = ({ onSave }) => {
  const [jobs, setJobs] = useState<Job[]>([]); //get rid of this
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);


  const toggleJobDescription = (jobId: string) => {
    setSelectedJobId((prevJobId) => (prevJobId === jobId ? null : jobId));
  };

  if (!jobs || jobs.length === 0) {
    return <p>No jobs found.</p>;
  }

  //check properties
  return (
    <div className={styles['job-list']}>
      <ul>
        {jobs.map((job) => (
          <li className={styles['job-card']} key={job.id}>
            <h2 className={styles['job-title']}>{job.title} at {job.company}</h2>
            <p className={styles['job-info']}>{job.location} - {job.type}</p>
            <button className={styles.button} onClick={() => toggleJobDescription(job.id)}>
              {selectedJobId === job.id ? 'Hide Description' : 'View Job'}
            </button>
            {selectedJobId === job.id && (
              <>
                <p className={styles['job-description']}>{job.description}</p>
                <a href={job.url} target="_blank" rel="noopener noreferrer" className={styles['job-link']}>
                  Job Details
                </a>
              </>
            )}
            <button className={styles.button} onClick={() => onSave(job)}>Save Job</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;


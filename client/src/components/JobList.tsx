import React, { useState, useEffect } from 'react';
import type {JobDetails} from "../types/interface/jobSearch"; //new interface
import styles from './JobList.module.css';


interface JobListProps {
  jobs: JobDetails[];
  onSave: (job: JobDetails) => void;
  onRemove: (jobId: string) => void;
  onMarkAsApplied: (jobId: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onSave }) => {
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
          <li className={styles['job-card']} key={job.job_id}>
            <h2 className={styles['job-title']}>{job.job_title} at {job.employer_name}</h2>
            <p className={styles['job-info']}>{job.job_location} - {job.job_employment_type} - {job.job_is_remote} - {job.job_posted_at}</p>
            <button className={styles.button} onClick={() => toggleJobDescription(job.job_id)}>
              {selectedJobId === job.job_id ? 'Hide Description' : 'View Job'}
            </button>
            {selectedJobId === job.job_id && (
              <>
                <p className={styles['job-description']}>{job.job_description}</p>
                <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer" className={styles['job-link']}>
                  Job Details
                </a>
              </>
            )}
            <button className={styles.button} onClick={() => onSave(job)}>Save Job</button>
            <button className={styles.button} onClick={() => onMarkAsApplied(job.job_id)}>Mark as applied</button>
            <button className={styles.button} onClick={() => onRemove(job.job_id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;


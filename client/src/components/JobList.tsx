import React, { useState } from 'react';
import type { JobDetails } from "../types/interface/jobSearch"; //new interface
import styles from './JobList.module.css';

interface JobListProps {
  jobs: JobDetails[];
  onSave: (job: JobDetails) => void;
  onRemove: (job_id: string) => void; 
  onMarkAsApplied: (job_id: string) => void;
  isLoggedIn: boolean; //Only logged in usrs can perform job actions
}

const JobList: React.FC<JobListProps> = ({ jobs, onSave, onRemove, onMarkAsApplied, isLoggedIn }) => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const toggleJobDescription = (job_id: string) => {
    setSelectedJobId((prevJobId) => (prevJobId === job_id ? null : job_id));
  };

  if (!jobs || jobs.length === 0) {
    return <p>You have not saved any job yet.</p>;
  }

  return (
    <>
      <ul className={styles['job-list']}>
        {jobs.map((jobDetails) => ( // ✅ Fixed variable name
          <li className={styles['job-card']} key={jobDetails.job_id}> 
            <h2 className={styles['job-title']}>{jobDetails.job_title} at {jobDetails.employer_name}</h2>
            <p className={styles['job-info']}>
              {jobDetails.job_location} - {jobDetails.job_employment_type} - {jobDetails.job_is_remote ? 'Remote' : 'On-site'} - 
              {jobDetails.job_posted_at}</p>

            <button className={styles.button} onClick={() => toggleJobDescription(jobDetails.job_id)}>
              {selectedJobId === jobDetails.job_id ? 'Hide Description' : 'View Job'}
            </button>

            {selectedJobId === jobDetails.job_id && (
              <>
                <p className={styles['job-description']}>{jobDetails.job_description}</p>
                <a href={jobDetails.job_apply_link} target="_blank" rel="noopener noreferrer" className={styles['job-link']}>
                  Job Details
                </a>
              </>
            )}

              {isLoggedIn && (
              <>
                <button className={styles.button} onClick={() => onSave(jobDetails)}>Save Job</button>
                <button className={styles.button} onClick={() => onMarkAsApplied(jobDetails.job_id)}>Mark as Applied</button>
                <button className={styles.button} onClick={() => onRemove(jobDetails.job_id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default JobList;

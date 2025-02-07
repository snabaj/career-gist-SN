import React from 'react';
import { Job } from '../types/types';

interface JobListProps {
  jobs: Job[];
  onSave: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onSave }) => (
  <ul>
    {jobs.map(job => (
      <li key={job.id}>
        <h2>{job.title} at {job.company}</h2>
        <p>{job.description}</p>
        <a href={job.url} target="_blank" rel="noopener noreferrer">View Job</a>
        <button onClick={() => onSave(job)}>Save Job</button>
      </li>
    ))}
  </ul>
);

export default JobList;

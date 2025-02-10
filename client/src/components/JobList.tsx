import React, { useState } from 'react';
import { Job } from '../types/types';

// Props definition
interface JobListProps {
  jobs: Job[];
  onSave: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onSave }) => {
  console.log("Rendering jobs in JobList.tsx:", jobs); // Debugging Log

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const toggleJobDescription = (jobId: string) => {
    setSelectedJobId((prevJobId) => (prevJobId === jobId ? null : jobId));
  };

  if (!jobs || jobs.length === 0) {
    return <p>No jobs found.</p>; // Display message if no jobs
  }

  return (
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>
          <h2>{job.title} at {job.company}</h2>
          <button onClick={() => toggleJobDescription(job.id)}>
            {selectedJobId === job.id ? 'Hide Description' : 'View Job'}
          </button>
          {selectedJobId === job.id && (
            <p>{job.description}</p>
          )}
          <button onClick={() => onSave(job)}>Save Job</button>
        </li>
      ))}
    </ul>
  );
};

export default JobList;

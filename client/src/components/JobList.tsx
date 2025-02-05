import React from 'react';
import { Job } from '../types/types';

interface Props {
  jobs: Job[];
  listType: 'saved' | 'applied' | 'searchResults'; // Add 'searchResults' as a valid type
}

const JobList: React.FC<Props> = ({ jobs, listType }) => {
  return (
    <ul>
      {jobs.map(job => (
        <li key={job.id}>
          {job.title} at {job.company} - {job.location}
        </li>
      ))}
    </ul>
  );
};

export default JobList;
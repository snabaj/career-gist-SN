// JobList.tsx
import React from 'react';
import JobItem from './JobItem';
import { Job } from '../types/types'; // Ensure this path is correct

interface Props {
  jobs: Job[];
  listType: 'saved' | 'applied';
}

const JobList: React.FC<Props> = ({ jobs, listType }) => (
    <ul>
        {jobs.map(job => (
            <JobItem key={job.id} {...job} listType={listType} />
        ))}
    </ul>
);

export default JobList;

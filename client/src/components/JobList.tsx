// JobList.tsx
import React from 'react';
import JobItem from './JobItem';  // Ensure this path is correct
import { Job } from '../types/types';  // Ensure this path is correct

interface JobListProps {
    jobs: Job[];
    onSave: (job: Job) => void;
    onShare: (job: Job) => void;
    onRemove: (jobId: string) => void;
    onUpdateStatus: (jobId: string, status: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onSave, onShare, onRemove, onUpdateStatus }) => (
    <ul>
        {jobs.map(job => (
            <JobItem 
                key={job.id} 
                {...job} 
                onSave={onSave}
                onShare={onShare}
                onRemove={() => onRemove(job.id)}
                onUpdateStatus={status => onUpdateStatus(job.id, status)}
            />
        ))}
    </ul>
);

export default JobList;

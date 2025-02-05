// JobsContext.tsx
import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { Job } from '../types/types';  // Adjust the path as necessary

type JobsContextType = {
    jobs: Job[];
    loading: boolean;
    error: string | null;
    saveJob: (job: Job) => void;
    applyToJob: (jobId: string, date: string) => void;
    removeJob: (jobId: string) => void;
    updateJobStatus: (jobId: string, status: string) => void;
};

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const saveJob = (job: Job) => {
        setJobs(prevJobs => [...prevJobs, job]);
    };

    const applyToJob = (jobId: string, date: string) => {
        setJobs(prevJobs =>
            prevJobs.map(job => job.id === jobId ? { ...job, appliedDate: date } : job)
        );
    };

    const removeJob = (jobId: string) => {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    };

    const updateJobStatus = (jobId: string, status: string) => {
        setJobs(prevJobs =>
            prevJobs.map(job => job.id === jobId ? {...job, status: status} : job)
        );
    };

    return (
        <JobsContext.Provider value={{ jobs, loading, error, saveJob, applyToJob, removeJob, updateJobStatus }}>
            {children}
        </JobsContext.Provider>
    );
};

export const useJobs = () => {
    const context = useContext(JobsContext);
    if (!context) {
        throw new Error('useJobs must be used within a JobsProvider');
    }
    return context;
};

export default JobsContext;

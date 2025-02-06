import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Job } from '../types/types';

interface JobsContextType {
    jobs: Job[];
    loading: boolean;
    error: string | null;
    fetchJobs: () => Promise<void>;
    saveJob: (job: Job) => void;
    applyToJob: (jobId: string, appliedDate: string) => void;
    removeJob: (jobId: string) => void;
    updateJobStatus: (jobId: string, status: string) => void; // Add updateJobStatus to the interface
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/jobs');
            const data = await response.json();
            setJobs(data);
            setError(null);
        } catch (err) {
            setError('Failed to load jobs');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const saveJob = (job: Job) => {
        setJobs(prevJobs => [...prevJobs, job]);
    };

    const applyToJob = (jobId: string, appliedDate: string) => {
        setJobs(prevJobs =>
            prevJobs.map(job =>
                job.id === jobId ? { ...job, appliedDate } : job
            )
        );
    };

    const removeJob = (jobId: string) => {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    };

    const updateJobStatus = (jobId: string, status: string) => {
        setJobs(prevJobs =>
            prevJobs.map(job =>
                job.id === jobId ? { ...job, status } : job
            )
        );
    };

    return (
        <JobsContext.Provider value={{ jobs, loading, error, fetchJobs, saveJob, applyToJob, removeJob, updateJobStatus }}>
            {children}
        </JobsContext.Provider>
    );
};

export const useJobs = (): JobsContextType => {
    const context = useContext(JobsContext);
    if (!context) {
        throw new Error('useJobs must be used within a JobsProvider');
    }
    return context;
};

export default JobsContext;
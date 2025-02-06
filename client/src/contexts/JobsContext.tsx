import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Job } from '../types/types';

interface JobsContextType {
    jobs: Job[];
    loading: boolean;
    error: string | null;
    fetchJobs: () => Promise<void>;
    saveJob: (job: Job) => Promise<void>;
    applyToJob: (jobId: string, appliedDate: string) => Promise<void>;
    removeJob: (jobId: string) => Promise<void>;
    updateJobStatus: (jobId: string, status: string) => Promise<void>;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
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

    const saveJob = async (job: Job) => {
        setLoading(true);
        try {
            // Simulate API call to save job
            setJobs(prevJobs => [...prevJobs, job]);
            setError(null);
        } catch (err) {
            setError('Failed to save job');
        } finally {
            setLoading(false);
        }
    };

    const applyToJob = async (jobId: string, appliedDate: string) => {
        setLoading(true);
        try {
            // Simulate API call to apply to job
            setJobs(prevJobs =>
                prevJobs.map(job =>
                    job.id === jobId ? { ...job, appliedDate } : job
                )
            );
            setError(null);
        } catch (err) {
            setError('Failed to apply to job');
        } finally {
            setLoading(false);
        }
    };

    const removeJob = async (jobId: string) => {
        setLoading(true);
        try {
            // Simulate API call to remove job
            setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
            setError(null);
        } catch (err) {
            setError('Failed to remove job');
        } finally {
            setLoading(false);
        }
    };

    const updateJobStatus = async (jobId: string, status: string) => {
        setLoading(true);
        try {
            // Simulate API call to update job status
            setJobs(prevJobs =>
                prevJobs.map(job =>
                    job.id === jobId ? { ...job, status } : job
                )
            );
            setError(null);
        } catch (err) {
            setError('Failed to update job status');
        } finally {
            setLoading(false);
        }
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

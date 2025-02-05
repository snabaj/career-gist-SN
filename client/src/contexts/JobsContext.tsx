import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Job } from '../types/types';

interface JobsContextType {
    jobs: Job[];
    loading: boolean;
    error: string | null;
    saveJob: (job: Job) => void;
    applyToJob: (jobId: string, appliedDate: string) => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJobs = async () => {
        try {
            // Simulate an API call
            const response = await fetch('/api/jobs');
            const data = await response.json();
            setJobs(data);
            setError(null); // Clear previous errors on successful load
        } catch (err) {
            setError('Failed to load jobs');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchJobs(); // Call this function to load jobs on component mount
    }, []);

    const saveJob = (job: Job) => {
        // Implement the logic to save a job
        setJobs(prevJobs => [...prevJobs, job]);
    };

    const applyToJob = (jobId: string, appliedDate: string) => {
        // Implement the logic to apply to a job
        setJobs(prevJobs =>
            prevJobs.map(job =>
                job.id === jobId ? { ...job, appliedDate } : job
            )
        );
    };

    return (
        <JobsContext.Provider value={{ jobs, loading, error, saveJob, applyToJob }}>
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
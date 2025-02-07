import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Job } from '../types/types';

const AppliedToPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await fetch('/api/applied-jobs');
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching applied jobs:', error);
                setError('Could not load applied jobs.');
            }
            setLoading(false);
        };
        fetchAppliedJobs();
    }, []);

    return (
        <div>
            <h1>Applied To Jobs</h1>
            {loading && <Spinner />}
            {error && <p className="error">{error}</p>}
            {jobs.length > 0 ? (
                <ul>
                    {jobs.map(job => (
                        <li key={job.id}>
                            {job.title} at {job.company}
                            <a href={job.url} target="_blank" rel="noopener noreferrer">View Job</a>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>You have not applied to any jobs yet.</p>
            )}
        </div>
    );
};

export default AppliedToPage;

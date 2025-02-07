import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Job } from '../types/types';
import styles from './SavedJobs.module.css';

const SavedJobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const response = await fetch('/api/saved-jobs');
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching saved jobs:', error);
                setError('Could not load saved jobs.');
            }
            setLoading(false);
        };
        fetchSavedJobs();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Saved Jobs</h1>
            {loading && <Spinner />}
            {error && <p className="error">{error}</p>}
            {jobs.length > 0 ? (
                <ul className={styles.jobsList}>
                    {jobs.map(job => (
                        <li key={job.id} className={styles.jobItem}>
                            {job.title} at {job.company}
                            <a href={job.url} target="_blank" rel="noopener noreferrer">View Jobs</a>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>No jobs saved yet.</p>
            )}
        </div>
    );
};

export default SavedJobs;

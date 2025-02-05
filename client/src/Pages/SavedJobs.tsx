import React from 'react';
import { useJobs } from '../contexts/JobsContext';
import styles from './SavedJobs.module.css';

const SavedJobs: React.FC = () => {
    const { jobs, applyToJob } = useJobs();

    return (
        <div className={styles.container}>
            <h1>Saved Jobs</h1>
            {jobs.length > 0 ? (
                <ul className={styles.jobsList}>
                    {jobs.map(job => (
                        <li key={job.id} className={styles.jobItem}>
                            {job.title} at {job.company} - {job.location}
                            <button onClick={() => applyToJob(job.id, new Date().toISOString())}>
                                Apply
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No jobs saved yet.</p>
            )}
        </div>
    );
};

export default SavedJobs;
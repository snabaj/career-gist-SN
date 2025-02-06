import React from 'react';
import { useJobs } from '../contexts/JobsContext';
import styles from './SavedJobs.module.css';
import Spinner from '../components/Spinner';  // Ensure you have a Spinner component

const SavedJobs: React.FC = () => {
    const { jobs, loading, error, removeJob, applyToJob } = useJobs();

    return (
        <div className={styles.container}>
            <h1>Saved Jobs</h1>
            {loading && <Spinner />}  // Display a loading indicator when loading is true
            {error && <p className="error">{error}</p>}  // Display error messages when error is not null
            {jobs.length > 0 ? (
                <ul className={styles.jobsList}>
                    {jobs.map(job => (
                        <li key={job.id} className={styles.jobItem}>
                            {job.title} at {job.company} - {job.location}
                            <button onClick={() => applyToJob(job.id, new Date().toISOString())}>
                                Apply
                            </button>
                            <button onClick={() => removeJob(job.id)} style={{ marginLeft: '10px' }}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : !loading && !error && (
                <p>No jobs saved yet.</p>
            )}
        </div>
    );
};

export default SavedJobs;

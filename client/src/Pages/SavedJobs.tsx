// src/pages/SavedJobs.tsx
import React, { useState, useEffect } from 'react';
import styles from './SavedJobs.module.css'; // Ensure you have this CSS module created


type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
};

const SavedJobs: React.FC = () => {
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);

    // Load saved jobs from local storage on component mount
    useEffect(() => {
        const jobs = localStorage.getItem('savedJobs');
        if (jobs) {
            setSavedJobs(JSON.parse(jobs));
        }
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Saved Jobs</h1>
            {savedJobs.length > 0 ? (
                <ul className={styles.jobsList}>
                    {savedJobs.map(job => (
                        <li className={styles.jobItem} key={job.id}>
                            {job.title} at {job.company} - {job.location}
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

// JobItem.tsx
import React from 'react';
import { Job } from '../types/types';  // Adjust path as necessary
import styles from './JobList.module.css';  // Adjust path as necessary

interface JobItemProps extends Job {
    onSave: (job: Job) => void;
    onShare: (job: Job) => void;
    onRemove: () => void;
    onUpdateStatus: (status: string) => void;
}

const JobItem: React.FC<JobItemProps> = ({ id, type, url, company, location, title, description, onSave, onShare, onRemove, onUpdateStatus }) => (
    <li className={styles.listItem}>
        <h2 className={styles.title}>{title} ({type}) at {company}</h2>
        <p className={styles.location}>{location}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>View Posting</a>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <button onClick={() => onSave({ id, type, url, company, location, title, description })}>Save Job</button>
        <button onClick={() => onShare({ id, type, url, company, location, title, description })}>Share Job</button>
        <button onClick={onRemove}>Remove Job</button>
        <button onClick={() => onUpdateStatus('Interviewing')}>Mark as Interviewing</button>
    </li>
);

export default JobItem;

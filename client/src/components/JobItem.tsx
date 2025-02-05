// JobItem.tsx
import React from 'react';
import { Job } from '../types/types'; // Ensure this path is correct
import styles from './JobList.module.css';

interface JobItemProps extends Job {
    listType: 'saved' | 'applied';
}

const JobItem: React.FC<JobItemProps> = ({ id, type, url, company, location, title, description, listType }) => (
    <li className={styles.listItem}>
        <h2 className={styles.title}>{title} ({type}) at {company}</h2>
        <p className={styles.location}>{location}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>View Posting</a>
        <div dangerouslySetInnerHTML={{ __html: description }} />
    </li>
);

export default JobItem;

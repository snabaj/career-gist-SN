import React from 'react';
import styles from './JobList.module.css';

interface JobDescriptionProps {
  text: string;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ text }) => {
  const sentences = text.split(/(?<=\.)\s+/);
  return (
    <div className={styles['job-description']}>
      {sentences.map((sentence, index) => (
        <span key={index} className={styles['sentence']}>{sentence}<br /></span>
      ))}
    </div>
  );
};

export default JobDescription;

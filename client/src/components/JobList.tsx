// import React, { useState } from 'react';
// import { Job } from '../types/types';

// // Props definition
// interface JobListProps {
//   jobs: Job[];
//   onSave: (job: Job) => void;
// }

// const JobList: React.FC<JobListProps> = ({ jobs, onSave }) => {
//   console.log("Rendering jobs in JobList.tsx:", jobs); // Debugging Log

//   const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

//   const toggleJobDescription = (jobId: string) => {
//     setSelectedJobId((prevJobId) => (prevJobId === jobId ? null : jobId));
//   };

//   if (!jobs || jobs.length === 0) {
//     return <p>No jobs found.</p>; // Display message if no jobs
//   }

//   return (
//     <ul>
//       {jobs.map((job) => (
//         <li key={job.id}>
//           <h2>{job.title} at {job.company}</h2>
//           <button onClick={() => toggleJobDescription(job.id)}>
//             {selectedJobId === job.id ? 'Hide Description' : 'View Job'}
//           </button>
//           {selectedJobId === job.id && (
//             <p>{job.description}</p>
//           )}
//           <button onClick={() => onSave(job)}>Save Job</button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default JobList;

//Dummy API Function to Simulate Job Listings
import React, { useState, useEffect } from 'react';
import { Job } from '../types/types';
import fetchDummyJobs from '../types/types/fetchDummyJobs'; // ✅ Fixed Import Path!
import styles from './JobList.module.css';


interface JobListProps {
  onSave: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ onSave }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const fetchedJobs = await fetchDummyJobs(); // ✅ Fetch from Dummy API
        setJobs(fetchedJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const toggleJobDescription = (jobId: string) => {
    setSelectedJobId((prevJobId) => (prevJobId === jobId ? null : jobId));
  };

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (!jobs || jobs.length === 0) {
    return <p>No jobs found.</p>;
  }

  return (
    <div className={styles['job-list']}>
      <ul>
        {jobs.map((job) => (
          <li className={styles['job-card']} key={job.id}>
            <h2 className={styles['job-title']}>{job.title} at {job.company}</h2>
            <p className={styles['job-info']}>{job.location} - {job.type}</p>
            <button className={styles.button} onClick={() => toggleJobDescription(job.id)}>
              {selectedJobId === job.id ? 'Hide Description' : 'View Job'}
            </button>
            {selectedJobId === job.id && (
              <>
                <p className={styles['job-description']}>{job.description}</p>
                <a href={job.url} target="_blank" rel="noopener noreferrer" className={styles['job-link']}>
                  Job Details
                </a>
              </>
            )}
            <button className={styles.button} onClick={() => onSave(job)}>Save Job</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;


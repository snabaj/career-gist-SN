// import React, { useEffect, useState } from 'react';
// import Spinner from '../components/Spinner';
// import { Job } from '../types/types';
// import styles from './SavedJobs.module.css';

// //State initialization
//     // jobs → Stores the list of saved jobs.
//     // loading → true by default; once jobs are fetched, it becomes false.
//     // error → Stores an error message if fetching jobs fails.
// const SavedJobs: React.FC = () => {
//     const [jobs, setJobs] = useState<Job[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     //Fetching Saved Jobs
//         // useEffect() runs once when the component mounts (because of [] dependency array).
//         // Inside fetchSavedJobs() function:
//         // A test userId (1) is used (you’ll replace this with dynamic user authentication later).
//         // Calls API endpoint /api/favourites/${userId} to fetch saved jobs.
//         // Parses JSON response and stores it in setJobs().
//         // If an error occurs, logs it to console and sets setError().
//         // After API call, setLoading(false) stops the loading animation.
//     useEffect(() => {
//         const fetchSavedJobs = async () => {
//             try {
//                 //we need to know the user ID to fetch saved jobs
//                 const userId = 1; //tester userId
//                 //note that the apis here are placeholders and need to be replaced with the actual API endpoints
//                 const response = await fetch(`/api/favourites/${userId}`); // `/api/favourites/1/${userId}` tester endpoint
//                 const data = await response.json();
//                 setJobs(data);
//             } catch (error) {
//                 console.error('Error fetching saved jobs:', error);
//                 setError('Could not load saved jobs.');
//             }
//             setLoading(false);
//         };
//         fetchSavedJobs();
//     }, []);

//     //Rendering Saved Jobs
//         // <h1>Saved Jobs</h1> → Displays the page title.
//         // Show Spinner if loading is true → {loading && <Spinner />}
//         // Show error message if error exists → {error && <p className="error">{error}</p>}
//         // Display jobs if available → jobs.length > 0
//         // Loops through the jobs array using .map(), displaying:
//         // Job title
//         // Company name
//         // Clickable link to job posting
//         // If no jobs found, it shows "No jobs saved yet."


//     return (
//         <div className={styles.container}>
//             <h1>Saved Jobs</h1>
//             {loading && <Spinner />}
//             {error && <p className="error">{error}</p>}
//             {jobs.length > 0 ? (
//                 <ul className={styles.jobsList}>
//                     {jobs.map(job => (
//                         <li key={job.id} className={styles.jobItem}>
//                             {job.title} at {job.company}
//                             <a href={job.url} target="_blank" rel="noopener noreferrer">View Jobs</a>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 !loading && <p>No jobs saved yet.</p>
//             )}
//         </div>
//     );
// };

// export default SavedJobs;



//Dummy Data

import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Job } from '../types/types';
import styles from './SavedJobs.module.css';

// Dummy API function to simulate saved jobs
const fetchDummySavedJobs = async (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Software Engineer',
          company: 'Tech Corp',
          location: 'San Francisco, CA',
          type: 'Full-time',
          description: 'Develop and maintain software applications.',
          url: 'https://example.com/job1',
        },
        {
          id: '2',
          title: 'Frontend Developer',
          company: 'Creative Solutions',
          location: 'New York, NY',
          type: 'Contract',
          description: 'Design and implement user interfaces.',
          url: 'https://example.com/job2',
        },
      ]);
    }, 1000);
  });
};

const SavedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const data = await fetchDummySavedJobs(); // ✅ Fetch from dummy API
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
          {jobs.map((job) => (
            <li key={job.id} className={styles.jobItem}>
              <h2>{job.title} at {job.company}</h2>
              <p>{job.location} - {job.type}</p>
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                View Job
              </a>
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

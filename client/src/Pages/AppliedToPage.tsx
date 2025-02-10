// import React, { useEffect, useState } from 'react';
// import Spinner from '../components/Spinner';
// import { Job } from '../types/types';

// const AppliedToPage: React.FC = () => {
//     //Setting p Component State
//         // jobs (Job[]): Stores the list of applied jobs.
//         // loading (boolean): Keeps track of the fetch operation status (true = data is loading).
//         // error (string | null): Holds an error message if something goes wrong.

//     const [jobs, setJobs] = useState<Job[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchAppliedJobs = async () => {
//             try {
//                 const response = await fetch('/api/applied-jobs'); //api is a placeholder for the actual API endpoint
//                 const data = await response.json();
//                 setJobs(data);
//             } catch (error) {
//                 console.error('Error fetching applied jobs:', error);
//                 setError('Could not load applied jobs.');
//             }
//             setLoading(false);
//         };
//         fetchAppliedJobs();
//     }, []);

//     return (
//         <div>
//             <h1>Applied To Jobs</h1>
//             {loading && <Spinner />}
//             {error && <p className="error">{error}</p>}
//             {jobs.length > 0 ? (
//                 <ul>
//                     {jobs.map(job => (
//                         <li key={job.id}>
//                             {job.title} at {job.company}
//                             <a href={job.url} target="_blank" rel="noopener noreferrer">View Job</a>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 !loading && <p>You have not applied to any jobs yet.</p>
//             )}
//         </div>
//     );
// };

// export default AppliedToPage;


// //Key Points:
//     // This page does not rerender unnecessarily because:
//         // The effect runs only once ([] dependency array)
//         // State updates only when API returns new data

//Dummy Data

import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Job } from '../types/types';

// Dummy API function to simulate applied jobs
const fetchDummyAppliedJobs = async (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Backend Developer',
          company: 'Tech Innovators',
          location: 'Remote',
          type: 'Full-time',
          description: 'Develop APIs and manage backend services.',
          url: 'https://example.com/job1',
        },
        {
          id: '2',
          title: 'UI/UX Designer',
          company: 'Design Pro',
          location: 'Los Angeles, CA',
          type: 'Contract',
          description: 'Create intuitive user experiences and wireframes.',
          url: 'https://example.com/job2',
        },
      ]);
    }, 1000);
  });
};

const AppliedToPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const data = await fetchDummyAppliedJobs(); // ✅ Fetch from dummy API
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
          {jobs.map((job) => (
            <li key={job.id}>
              <h2>{job.title} at {job.company}</h2>
              <p>{job.location} - {job.type}</p>
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                View Job
              </a>
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

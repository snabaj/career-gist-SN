// import React, { useState } from 'react';
// import type {JobDetails} from "../types/interface/jobSearch"; //new interface
// import styles from './JobList.module.css';


// interface JobListProps {
//   jobs: JobDetails[];
//   onSave: (job: JobDetails) => void;
//   onRemove: (job_Id: string) => void;
//   onMarkAsApplied: (job_Id: string) => void;
// }

// const JobList: React.FC<JobListProps> = ({ jobs, onSave }) => {
//   const [selectedJobId, setSelectedJobId] = useState<string | null>(null);


//   const toggleJobDescription = (jobId: string) => {
//     setSelectedJobId((prevJobId) => (prevJobId === jobId ? null : jobId));
//   };

//   if (!jobs || jobs.length === 0) {
//     return <p>No jobs found.</p>;
//   }

//   //check properties
//   return (
//     <div className={styles['job-list']}>
//       <ul>
//         {jobs.map((jobDetails) => (
//           <li className={styles['job-card']} key={job.job_id}>
//             <h2 className={styles['job-title']}>{job.job_title} at {job.employer_name}</h2>
//             <p className={styles['job-info']}>{job.job_location} - {job.job_employment_type} - {job.job_is_remote} - {job.job_posted_at}</p>
//             <button className={styles.button} onClick={() => toggleJobDescription(job.job_id)}>
//               {selectedJobId === job.job_id ? 'Hide Description' : 'View Job'}
//             </button>
//             {selectedJobId === job.job_id && (
//               <>
//                 <p className={styles['job-description']}>{job.job_description}</p>
//                 <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer" className={styles['job-link']}>
//                   Job Details
//                 </a>
//               </>
//             )}
//             <button className={styles.button} onClick={() => onSave(job: jobDetails)}>Save Job</button>
//             <button className={styles.button} onClick={() => onMarkAsApplied(job.job_id)}>Mark as applied</button>
//             <button className={styles.button} onClick={() => onRemove(job.job_id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default JobList;



import React, { useState } from 'react';
import type { JobDetails } from "../types/interface/jobSearch"; //new interface
import styles from './JobList.module.css';

interface JobListProps {
  jobs: JobDetails[];
  onSave: (job: JobDetails) => void;
  onRemove: (job_id: string) => void; // ✅ Fixed `job_Id` → `job_id`
  onMarkAsApplied: (job_id: string) => void; // ✅ Fixed `job_Id` → `job_id`
}

const JobList: React.FC<JobListProps> = ({ jobs, onSave, onRemove, onMarkAsApplied }) => { // ✅ Added missing props
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const toggleJobDescription = (job_id: string) => {
    setSelectedJobId((prevJobId) => (prevJobId === job_id ? null : job_id));
  };

  if (!jobs || jobs.length === 0) {
    return <p>No jobs found.</p>;
  }

  return (
    <div className={styles['job-list']}>
      <ul>
        {jobs.map((jobDetails) => ( // ✅ Fixed variable name
          <li className={styles['job-card']} key={jobDetails.job_id}> 
            <h2 className={styles['job-title']}>{jobDetails.job_title} at {jobDetails.employer_name}</h2>
            <p className={styles['job-info']}>{jobDetails.job_location} - {jobDetails.job_employment_type} - {jobDetails.job_is_remote ? 'Remote' : 'On-site'} - {jobDetails.job_posted_at}</p>
            
            <button className={styles.button} onClick={() => toggleJobDescription(jobDetails.job_id)}>
              {selectedJobId === jobDetails.job_id ? 'Hide Description' : 'View Job'}
            </button>

            {selectedJobId === jobDetails.job_id && (
              <>
                <p className={styles['job-description']}>{jobDetails.job_description}</p>
                <a href={jobDetails.job_apply_link} target="_blank" rel="noopener noreferrer" className={styles['job-link']}>
                  Job Details
                </a>
              </>
            )}

            {/* ✅ Fixed function calls */}
            <button className={styles.button} onClick={() => onSave(jobDetails)}>Save Job</button>
            <button className={styles.button} onClick={() => onMarkAsApplied(jobDetails.job_id)}>Mark as applied</button>
            <button className={styles.button} onClick={() => onRemove(jobDetails.job_id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;

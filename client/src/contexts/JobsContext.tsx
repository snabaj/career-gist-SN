// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { Job } from '../types/types';

// //Definig the JobsContextType interface
// // ✅ Defines the shape of the context
// // ✅ Ensures all components using this context follow the correct data structure
// // ✅ Provides function types for fetching and managing jobs
// interface JobsContextType {
//     jobs: Job[];
//     loading: boolean;
//     error: string | null;
//     fetchJobs: () => Promise<void>;
//     saveJob: (job: Job) => void;
//     applyToJob: (jobId: string, appliedDate: string) => void;
//     removeJob: (jobId: string) => void;
//     updateJobStatus: (jobId: string, status: string) => void; // Add updateJobStatus to the interface
// }

// //Creating the JobsContext
// // ✅ Creates a React Context for job-related state and functions
// // ✅ The default value is undefined, requiring components to be wrapped in a provider
// const JobsContext = createContext<JobsContextType | undefined>(undefined);

// //Implementing the JobsProvider
// // ✅ Creates a stateful provider component that wraps the application
// // ✅ Manages:
//     // jobs → Stores the job listings
//     // loading → Controls the loading spinner
//     // error → Stores any API request errors
// export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [jobs, setJobs] = useState<Job[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     //Fetching Jobs
//     // ✅ Calls /api/jobs to fetch job listings from the backend
//     // ✅ Stores job data in jobs state
//     // ✅ Handles errors gracefully
//     // ✅ Toggles loading state to show/hide the spinner


//     const fetchJobs = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch('/api/jobs');
//             const data = await response.json();
//             setJobs(data);
//             setError(null);
//         } catch (err) {
//             setError('Failed to load jobs');
//         }
//         setLoading(false);
//     };

//     //Automatically fetch jobs when the component mounts
//     // ✅ Runs fetchJobs() when the component mounts
//     // ✅ Ensures job data is loaded as soon as the app starts
//     useEffect(() => {
//         fetchJobs();
//     }, []);

//     const saveJob = (job: Job) => {
//         setJobs(prevJobs => [...prevJobs, job]);
//     };

//     //Applying to a Job
//     // ✅ Updates the appliedDate for a job with the given jobId
//     // ✅ Marks a job as "applied"
//     const applyToJob = (jobId: string, appliedDate: string) => {
//         setJobs(prevJobs =>
//             prevJobs.map(job =>
//                 job.id === jobId ? { ...job, appliedDate } : job
//             )
//         );
//     };

//     //Removing a Job
//     // ✅ Removes a job from the jobs list based on its jobId
//     const removeJob = (jobId: string) => {
//         setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
//     };

//     //Updating Job Status
//     // ✅ Updates the status of a job with the given jobId
//     const updateJobStatus = (jobId: string, status: string) => {
//         setJobs(prevJobs =>
//             prevJobs.map(job =>
//                 job.id === jobId ? { ...job, status } : job
//             )
//         );
//     };

//     //Wrapping the children components with the JobsContext.Provider
//     //Makes job data & function available globally
//     return (
//         <JobsContext.Provider value={{ jobs, loading, error, fetchJobs, saveJob, applyToJob, removeJob, updateJobStatus }}>
//             {children}
//         </JobsContext.Provider>
//     );
// };

// //Custom Hook for using the JobsContext
// // ✅ Allows components to easily access job-related state & functions
// // ✅ Ensures useJobs() can only be used inside JobsProvider
// export const useJobs = (): JobsContextType => {
//     const context = useContext(JobsContext);
//     if (!context) {
//         throw new Error('useJobs must be used within a JobsProvider');
//     }
//     return context;
// };

// export default JobsContext;

// //Key Points:
// // ✅ Centralizes Job Management
// // ✅ Prevents Unnecessary API Calls (fetches jobs once)
// // ✅ Optimized for Global Access (any component can use job functions)
// // ✅ Ensures Type Safety with JobsContextType
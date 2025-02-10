// //Imports:
// // ✅ Imports React & useState Hook
// // ✅ Imports Components:
//   // SearchForm: Handles job search input & button
//   // JobList: Displays the list of jobs
//   // Spinner: Shows a loading animation
//   // ✅ Imports Job type from types/types.ts (ensures type safety)
//   // ✅ Imports styles from App.css & HomePage.css

// import React, { useState } from 'react';
// import SearchForm from '../components/SearchForm';
// import JobList from '../components/JobList';
// import Spinner from '../components/Spinner';
// import { Job } from '../types/types';
// import '../App.css';
// import './HomePage.css';


// //State management
//   //jobs: stores the list of jobs returned from the search query
//   //loading: indicates whether the search is in progress
//   //error: stores an error message if the search fails
// const HomePage: React.FC = () => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   //Handling Job Search
//   //Takes a search query as input and fetches job data from the server
//   //sets the loading state to true while the search is in progress
//   //Calls the API endpoint /api/jsearch/query with the search query
//     //Backend process the query and returns a list of jobs
//     //Returns the jobb results in data.jobs
//       //Handles API errors
//       //Updates the jobs state with the job results
  
//   //Key optimization:
//     // (1) This function only runs when the search button is clicked (not every keystroke)
//     // (2) Error Handling ensures that the user is informed if the search fails
//   const handleSearch = async (query: string) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`http://localhost:3001/api/jsearch/query?query=${encodeURIComponent(query)}`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setJobs(data.data.data); // ✅ Extracts job listings from the response
//       // Adjust according to API response structure
//     } catch (error) {
//       console.error("Failed to load jobs:", error);
//       setError("Unable to fetch jobs. Please try again later.");
//     }

//     setLoading(false);
//   };


//   //Saving Jobs
//     //Sends a POST request to api/save-job with the job data
//     //Includes the job details in the request body
//     //If the request fails, it throws an error & alerts the user
//     //If the request succeeds, it alerts the user that the job was saved successfully

//     //Key optimization:
//       //no state changes needed (Backend handles job saving)
//       //no unnecessary re-renders (Frontend does not track the saved jobs)
      
//       //note that the apis here are placeholders and need to be replaced with the actual API endpoints
//   const handleSaveJob = async (job: Job) => {
//     try {
//       const response = await fetch('/api/save-job', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(job),
//       });

//       if (!response.ok) throw new Error('Failed to save job');
//       alert('Job saved successfully!');
//     } catch (error) {
//       console.error('Error saving job:', error);
//       alert('Error saving job. Try again later.');
//     }
//   };

//   return (
//     <div>
//       <h1 className="homepage-h1">Welcome to Career Gist</h1>
//       <h2 className="homepage-h2">Because Searching for Jobs Should be Easy</h2>

//       <SearchForm onSearch={handleSearch} loading={loading} />

//       {loading && <Spinner />}
//       {error && <p className="error">{error}</p>}
   
//       {jobs.length > 0 ? (
//         <JobList jobs={jobs} onSave={handleSaveJob} />
//       ) : (
//         !loading && <p>No results found.</p>
//       )}
//     </div>
//   );
// };

// export default HomePage;



// //UI Breakdown

// // Header Titles
//   // "Welcome to Career Gist"
//   // "Because Searching for Jobs Should be Easy"


//   // Search Form (SearchForm)
//     // Calls handleSearch when the user clicks search
//     // Disables the button when loading is true
//     // Loading Spinner (Spinner)

// // Only visible when loading === true
//   // Error Message

// // Displays when error is not null
//   // Job List (JobList)

// // If jobs exist, it renders the job list
//   // If no jobs exist, it displays "No results found."


// //How Everything Should Tie Together:
//   // 1️⃣ User enters a job title in SearchForm and clicks search
//   // 2️⃣ handleSearch() is triggered, sending an API request
//   // 3️⃣ The API returns job listings, and jobs state updates
//   // 4️⃣ Job listings are displayed inside JobList
//   // 5️⃣ User can click "Save Job", triggering handleSaveJob()
//   // 6️⃣ Job gets saved to the backend

// //Key Optimization and Features:
// // ✅ Minimal re-renders (Only updates when searching)
// // ✅ Prevents unnecessary API calls (Only runs when the button is clicked)
// // ✅ Backend handles job saving (No need to track saved jobs on the frontend)
// // ✅ Error handling & loading state management


//Dummy API Function to Simulate Job Listings
import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import JobList from '../components/JobList';
import Spinner from '../components/Spinner';
import { Job } from '../types/types';
import fetchDummyJobs from '../types/types/fetchDummyJobs'; // ✅ Corrected Import Path!
import '../App.css';
import './HomePage.css';
const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 **Handle Search Using Dummy API**
  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching dummy jobs for:", query);
      const data = await fetchDummyJobs(); // ✅ Fetch from Dummy API
      setJobs(data);
    } catch (error) {
      console.error("Failed to load jobs:", error);
      setError("Unable to fetch jobs. Please try again later.");
    }

    setLoading(false);
  };

  // 🔹 **Handles Saving Jobs (No Backend Needed Yet)**
  const handleSaveJob = async (job: Job) => {
    alert(`Job saved: ${job.title} at ${job.company}`); // ✅ Simulated Save
  };

  return (
    <div>
      <h1 className="homepage-h1">Welcome to Career Gist</h1>
      <h2 className="homepage-h2">Because Searching for Jobs Should be Easy</h2>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}
   
      {jobs.length > 0 ? (
        <JobList jobs={jobs} onSave={handleSaveJob} />
      ) : (
        !loading && <p>No results found.</p>
      )}

    </div>
  );
};

export default HomePage;


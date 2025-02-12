import { JobDetails } from '../types/interface/jobSearch.js';
import { ApiMessage } from '../types/interface/jobSearch.js';
import Auth from '../utils/auth';

const retrieveJobs = async (): Promise<JobDetails[]> => {
    try {
      const response = await fetch('/api/jobs', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      });
  
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error fetching jobs: ', err);
    return [];
  }
};

const retrieveJobById = async (id: number): Promise<JobDetails> => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to fetch job details!');
      }
  
      return data;
    } catch (err) {
      console.error('Error fetching job by ID:', err);
      return Promise.reject('Could not fetch job');
    }
  };

  const saveJob = async (job: JobDetails): Promise<JobDetails> => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify(job)
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to save job!');
      }
  
      return data;
    } catch (err) {
      console.error('Error saving job:', err);
      return Promise.reject('Could not save job');
    }
  };
  
const retrieveSavedJobs = async (): Promise<JobDetails[]> => {
  try {
    const response = await fetch(
      '/api/jobs', 
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error retrieving saved jobs: ', err);
    return [];
  }
};

const deleteJob = async (jobId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/jobs/${jobId}`, 
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error deleting saved job: ', err);
    return Promise.reject('Could not delete job');
  }
};

export { retrieveJobs, retrieveJobById, saveJob, retrieveSavedJobs, deleteJob };
import { JobData } from '../interfaces/JobData';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from '../utils/auth';

const retrieveJobs = async () => {
  try {
    const response = await fetch(
      'https://external-job-api.com/jobs', // Replace with actual API URL
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
    console.log('Error fetching jobs: ', err);
    return [];
  }
};

const saveJob = async (job: JobData) => {
  try {
    const response = await fetch(
      '/api/jobs/', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify(job)
      }
    );
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error saving job: ', err);
    return Promise.reject('Could not save job');
  }
};

const retrieveSavedJobs = async (): Promise<JobData[]> => {
  try {
    const response = await fetch(
      '/api/jobs/saved', 
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

const deleteSavedJob = async (jobId: number): Promise<ApiMessage> => {
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

export { retrieveJobs, saveJob, retrieveSavedJobs, deleteSavedJob };
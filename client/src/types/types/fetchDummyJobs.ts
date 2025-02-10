import { Job } from '../types'; // ✅ Importing from `types.ts`

const fetchDummyJobs = async (): Promise<Job[]> => {
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
    }, 1000); // Simulating API delay
  });
};

export default fetchDummyJobs;

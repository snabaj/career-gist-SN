import { Job } from '../models/jobsModel.js';

export const seedJobs = async () => {
    await Job.bulkCreate([
      {
            job_id: "job_001",
            job_title: "Frontend Developer",
            employer_name: "TechCorp",
            job_publisher: "LinkedIn",
            job_employment_type: "Full-time",
            job_apply_link: "https://techcorp.com/jobs/frontend-dev",
            job_description: "We are looking for a skilled Frontend Developer proficient in React and TypeScript.",
            job_is_remote: true,
            job_posted_at: "2025-02-12T10:00:00Z",
            job_location: "Remote",
            job_city: "Boston",
            job_state: "MA",
            job_country: "USA",
            saved: false,
          },
          {
            job_id: "job_002",
            job_title: "Backend Engineer",
            employer_name: "DevSolutions",
            job_publisher: "Indeed",
            job_employment_type: "Contract",
            job_apply_link: "https://devsolutions.com/careers/backend-engineer",
            job_description: "Seeking an experienced Backend Engineer with expertise in Node.js, Express, and PostgreSQL.",
            job_is_remote: false,
            job_posted_at: "2025-02-10T14:30:00Z",
            job_location: "New York, NY",
            job_city: "New York",
            job_state: "NY",
            job_country: "USA",
            saved: true,
          },
    ]);
    };
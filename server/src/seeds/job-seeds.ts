import { Job } from '../models/jobsModel.js';
import { Company } from '../models/companyModel.js';

export const seedJobs = async () => {
    const companies = await Company.findAll();
    await Job.bulkCreate([
        {
          position: "Software Engineer",
          description: 'Develop and maintain software applications.',
          remote_onsite: 'Remote',
          salary: '$80,000 - $100,000',
          date_published: new Date(),
          experience_level: 'Mid-Level',
          company_id: companies[0].id,
    },
    {
          position: 'Frontend Developer',
          description: 'Work on the frontend using React and TypeScript.',
          remote_onsite: 'Hybrid',
          salary: '$70,000 - $90,000',
          date_published: new Date(),
          experience_level: 'Entry Level',
          company_id: companies[1].id,
    },
    {
          position: 'Backend Developer',
          description: 'Develop APIs and handle database interactions.',
          remote_onsite: 'Onsite',
          salary: '$90,000 - $110,000',
          date_published: new Date(),
          experience_level: 'Senior',
          company_id: companies[2].id,
      },
    ]);
    };
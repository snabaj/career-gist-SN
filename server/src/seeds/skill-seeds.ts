import { Skill } from '../models/skillsModel.js';

export const seedSkills = async () => {
    await Skill.bulkCreate([
        {
            job_id: 1,
            required_skills: 'JavaScript, React, Node.js',
        },
        {
            job_id: 2,
            required_skills: 'Python, Django, PostgreSQL',
        },
        {
            job_id: 3,
            required_skills: 'Java, Spring Boot, MySQL',
        }
    ]);
};

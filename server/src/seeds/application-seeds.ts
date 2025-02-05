import { Application } from '../models/applicationsModel.js';

export const seedApplications = async () => {
    await Application.bulkCreate([
        {
            job_id: 1,
            applied: true,
            date_applied: new Date(),
            attached_cover_letter: true,
            status: 'Pending',
        },
        {
            job_id: 2,
            applied: false,
            date_applied: new Date(),
            attached_cover_letter: false,
            status: 'No Response',
        },
        {
            job_id: 3,
            applied: true,
            date_applied: new Date(),
            attached_cover_letter: true,
            status: 'Accepted',
        },
    ]);
};
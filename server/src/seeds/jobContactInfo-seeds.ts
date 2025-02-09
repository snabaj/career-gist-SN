import { JobContactInfo } from '../models/jobContactInfoModel.js';

export const seedJobContacts = async () => {
    await JobContactInfo.bulkCreate([
        {
            job_id: 1,
            email: 'contact@techcorp.com',
            phone: '123-456-7890',
            address: '123 Tech Street, Silicon Valley, CA',
            contact_name: 'John Doe'
        },
        {
            job_id: 2,
            email: 'hr@innovatex.com',
            phone: '987-654-3210',
            address: '456 Innovation Ave, New York, NY',
            contact_name: 'Jane Smith'
        },
        {
            job_id: 3,
            email: 'info@startuplabs.com',
            phone: '555-987-6543',
            address: '789 Startup Road, Austin, TX',
            contact_name: 'Mark Johnson'
        }
    ]);
};
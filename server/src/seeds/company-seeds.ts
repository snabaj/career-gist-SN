import { Company } from '../models/companyModel.js';

export const seedCompanies = async () => {
    await Company.bulkCreate([
        {
            name: 'Tech Corp',
            url: 'https://techcorp.com',
        },
        {
            name: 'InnovateX',
            url: 'https://innovatex.com',
        },
        {
            name: 'Startup Labs',
            url: 'https://startuplabs.com',
        },
        {
            name: 'AI Solutions',
            url: 'https://aisolutions.com',
        }
    ]);
};

import { User } from '../models/user.js';

export const seedUsers = async () => {
    await User.bulkCreate([
        { username: 'BeanBag', password: 'password' },
        { username: 'MuffinTop', password: 'password' },
        { username: 'PrimeGuru', password: 'password' },
    ], { individualHooks: true });
};

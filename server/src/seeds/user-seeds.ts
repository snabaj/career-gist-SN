import { User } from '../models/userModel.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'Admin', password: 'password' },
    { username: 'SunnyDay', password: 'password' },
    { username: 'JollyWave', password: 'password' },
  ], { individualHooks: true });
};
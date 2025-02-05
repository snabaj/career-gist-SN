import { User } from '../models/userModel.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'SunnyEcho', password: 'password' },
    { username: 'ZippyFox', password: 'password' },
    { username: 'JollyWave', password: 'password' },
  ], { individualHooks: true });
};
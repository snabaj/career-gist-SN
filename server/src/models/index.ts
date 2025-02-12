import dotenv from 'dotenv';
dotenv.config();

import { CompanyFactory } from './companyModel.js';
import { JobContactInfoFactory } from './jobContactInfoModel.js';
import { SkillFactory } from './skillsModel.js';
import { JobFactory } from './jobsModel.js';
import { ApplicationFactory } from './applicationsModel.js';
import { UserFactory } from './userModel.js';
import sequelize from '../config/connection.js';


const Company = CompanyFactory(sequelize);
const JobContactInfo = JobContactInfoFactory(sequelize);
const Skill = SkillFactory(sequelize);
const Job = JobFactory(sequelize);
const Application = ApplicationFactory(sequelize);
const User = UserFactory(sequelize);

Company.hasMany(Job, { foreignKey: 'company_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Job.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });

Job.hasMany(JobContactInfo, { foreignKey: 'job_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
JobContactInfo.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

Job.hasMany(Application, { foreignKey: 'job_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

User.hasMany(Application, { foreignKey: 'user_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Application.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Job.hasMany(Skill, { foreignKey: 'job_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Skill.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

export { sequelize, Company, JobContactInfo, Skill, Job, Application, User };



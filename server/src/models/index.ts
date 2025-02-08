import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { CompanyFactory } from './companies/companyModel';
import { JobContactInfoFactory } from './jobContacts/jobContactInfoModel';
import { SkillFactory } from './skills/skillsModel';
import { JobFactory } from './jobs/job';
import { ApplicationFactory } from './applications/application';
import { UserFactory } from './users/userModel';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

const Company = CompanyFactory(sequelize);
const JobContactInfo = JobContactInfoFactory(sequelize);
const Skill = SkillFactory(sequelize);
const Job = JobFactory(sequelize);
const Application = ApplicationFactory(sequelize);
const User = UserFactory(sequelize);

Company.hasMany(JobContactInfo, { foreignKey: 'company_id' });
JobContactInfo.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });

Skill.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
Job.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });
User.hasMany(Application, { foreignKey: 'user_id' });
Application.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export { sequelize, Company, JobContactInfo, Skill, Job, Application, User };


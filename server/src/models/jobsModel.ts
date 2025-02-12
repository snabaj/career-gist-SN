import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface JobAttributes {
  id: number;
  title: string;
  description: string;
  remote_onsite: 'Remote' | 'Onsite' | 'Hybrid';
  salary: string;
  date_published: Date;
  experience_level: string;
  company_id: number;
  saved?: boolean;
}

interface JobCreationAttributes extends Optional<JobAttributes, "id"> {}

export class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public remote_onsite!: 'Remote' | 'Onsite' | 'Hybrid';
  public salary!: string;
  public date_published!: Date;
  public experience_level!: string;
  public company_id!: number;
}
export function JobFactory(sequelize: Sequelize): typeof Job {
  Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    remote_onsite: {
      type: DataTypes.ENUM('Remote', 'Onsite', 'Hybrid'),
      allowNull: false,
    },
    salary: {
      type: DataTypes.STRING,
    },
    date_published: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    experience_level: {
      type: DataTypes.STRING,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "jobs",
  }
);
return Job;
};


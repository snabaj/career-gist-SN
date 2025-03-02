import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface JobAttributes {
  id: number;
  job_id: string;
  job_title: string;
  employer_name: string;
  job_publisher: string;
  job_employment_type: string;
  job_apply_link: string;
  job_description: string;
  job_is_remote: boolean;
  job_posted_at: string;
  job_location: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
  saved?: boolean;
}

interface JobCreationAttributes extends Optional<JobAttributes, "job_id"> {}

export class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public job_id!: string;
  public job_title!: string;
  public employer_name!: string;
  public job_publisher!: string;
  public job_employment_type!: string;
  public job_apply_link!: string;
  public job_description!: string;
  public job_is_remote!: boolean;
  public job_posted_at!: string;
  public job_location!: string;
  public job_city?: string;
  public job_state?: string;
  public job_country?: string;
  public saved?: boolean;
}
export function JobFactory(sequelize: Sequelize): typeof Job {
  Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    job_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_employment_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_apply_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    job_is_remote: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    job_posted_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_city: {
      type: DataTypes.STRING,
    },
    job_state: {
      type: DataTypes.STRING,
    },
    job_country: {
      type: DataTypes.STRING,
    },
    saved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "jobs",
  }
);

return Job;
}
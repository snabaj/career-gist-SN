import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface JobContactInfoAttributes {
  id: number;
  job_id: number;
  email: string;
  phone: string;
  address: string;
  contact_name: string;
}

interface JobContactInfoCreationAttributes extends Optional<JobContactInfoAttributes, 'id'> {}

export class JobContactInfo extends Model<JobContactInfoAttributes, JobContactInfoCreationAttributes> implements JobContactInfoAttributes {
  public id!: number;
  public job_id!: number;
  public email!: string;
  public phone!: string;
  public address!: string;
  public contact_name!: string;
}

export function JobContactInfoFactory(sequelize: Sequelize): typeof JobContactInfo {
  JobContactInfo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'job_contacts',
      sequelize,
    }
  );
  return JobContactInfo;
}
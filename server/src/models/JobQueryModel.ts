import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/connection.js';

interface JobAttributes {
  id: number;
  query: string;
  results: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface JobCreationAttributes extends Optional<JobAttributes, "id"> {}

class JobModel extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public query!: string;
  public results!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Properly initialize the model
JobModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    query: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    results: {
      type: DataTypes.TEXT, // Storing JSON as string
      allowNull: false,
    },
  },
  {
    sequelize, // Ensure it's associated with Sequelize
    modelName: 'JobModel', // Explicitly define the model name
    tableName: "jobs-query",
    timestamps: true,
  }
);

// Register the model with Sequelize
export default JobModel;

import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface CompanyAttributes {
  id: number;
  name: string;
  url: string;
}

interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'id'> {}

export class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
  public id!: number;
  public name!: string;
  public url!: string;
}

export function CompanyFactory(sequelize: Sequelize): typeof Company {
  Company.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'companies',
      sequelize,
    }
  );
  return Company;
}

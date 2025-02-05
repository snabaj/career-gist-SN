import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface ApplicationAttributes {
  id: number;
  job_id: number;
  applied: boolean;
  date_applied: Date | null;
  attached_cover_letter: boolean;
  status: 'Pending' | 'Rejected' | 'Accepted' | 'No Response';
}

interface ApplicationCreationAttributes extends Optional<ApplicationAttributes, 'id'> {}

export class Application extends Model<ApplicationAttributes, ApplicationCreationAttributes> implements ApplicationAttributes {
  public id!: number;
  public job_id!: number;
  public applied!: boolean;
  public date_applied!: Date | null;
  public attached_cover_letter!: boolean;
  public status!: 'Pending' | 'Rejected' | 'Accepted' | 'No Response';
}

export function ApplicationFactory(sequelize: Sequelize): typeof Application {
    Application.init(
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
        applied: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        date_applied: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        attached_cover_letter: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        status: {
          type: DataTypes.ENUM('Pending', 'Rejected', 'Accepted', 'No Response'),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'applications',
      }
    );
    return Application;
}

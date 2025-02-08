import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface SkillAttributes {
  id: number;
  job_id: number;
  required_skills: string;
}

interface SkillCreationAttributes extends Optional<SkillAttributes, 'id'> {}

export class Skill extends Model<SkillAttributes, SkillCreationAttributes> implements SkillAttributes {
  public id!: number;
  public job_id!: number;
  public required_skills!: string;
}

export function SkillFactory(sequelize: Sequelize): typeof Skill {
  Skill.init(
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
      required_skills: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'skills',
      sequelize,
    }
  );
  return Skill;
}
import { DataTypes, Model, Sequelize } from "sequelize";
import { Gender } from "../../enums";
import { Models } from "../index";
import { DiagnoseModel } from "./diagnose_model";


export class PatientModel extends Model {
  id: number
  firstName: string
  lastName: string
  birthdate: string
  weight: number
  height: number
  identificationNumber: string
  gender: string

  // foreign keys
  diagnoseID: number
  diagnose: DiagnoseModel
}

export default (sequelize: Sequelize, modelName: string) => {
  PatientModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      identificationNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM(Gender.MALE, Gender.FEMALE),
        allowNull: false,
      },
      diagnoseID: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    },
    {
      paranoid: false,
      timestamps: false,
      sequelize,
      modelName,
      tableName: 'patients',
    }
  );

  (PatientModel as any).associate = (models: Models) => {
    PatientModel.belongsTo(models.Diagnose, { foreignKey: 'diagnoseID' })
    PatientModel.hasOne(models.User, { foreignKey: 'patientID' })
  }

  return PatientModel
}
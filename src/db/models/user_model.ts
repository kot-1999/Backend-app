import { DataTypes, Model, Sequelize } from "sequelize";
import { UserRole } from "../../enums";
import { PatientModel } from "./patient_model";
import { Models } from "../index";



export class UserModel extends Model{
  id: number
  name: string
  role: string
  patientID: number
  patient: PatientModel
}

export default (sequelize: Sequelize, modelName: string) => {
  UserModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
        allowNull: false
      },
      patientID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
      }
    },
    {
      paranoid: false,
      timestamps: true,
      sequelize,
      modelName,
      tableName: 'users'
    }
  );

  // (UserModel as any).associate = (models: Models) => {
  //   UserModel.belongsTo(models.Patient, { foreignKey: 'patientID' })
  // }

  return UserModel
}


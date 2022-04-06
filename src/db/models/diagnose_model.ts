import { DataTypes, Model, Sequelize } from "sequelize";
import { Models } from "../index";
import { SubstanceModel } from "./substance_model";
import { PatientModel } from "./patient_model";

export class DiagnoseModel extends Model {
  id: number
  name: string
  description: string

  // foreign keys
  substanceID: number
  substance: SubstanceModel
  patients: PatientModel[]
}

export default (sequelize: Sequelize, modelName: string) => {
  DiagnoseModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // foreign keys
      substanceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: false,
      timestamps: false,
      sequelize,
      modelName,
      tableName: 'diagnoses',
    }
  );

  (DiagnoseModel as any).associate = (models: Models) => {
    DiagnoseModel.belongsTo(models.Substance, { foreignKey: 'substanceID' })
    DiagnoseModel.hasMany(models.Patient, { foreignKey: 'diagnoseID' })
  }

  return DiagnoseModel
}
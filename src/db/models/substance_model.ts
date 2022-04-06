import { DataTypes, Model, Sequelize } from "sequelize";
import { Models } from "../index";
import { TimeUnit } from "../../enums";
import { DiagnoseModel } from "./diagnose_model";

export class SubstanceModel extends Model {
  id: number
  name: string
  timeUnit: string
  halfLife: number

  // foreign keys
  diagnoses: DiagnoseModel[]
}

export default (sequelize: Sequelize, modelName: string) => {
  SubstanceModel.init(
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
      timeUnit: {
        type: DataTypes.ENUM(TimeUnit.DAY, TimeUnit.HOUR, TimeUnit.MINUTE, TimeUnit.SECOND),
        allowNull: false,
      },
      halfLife: {
        type: DataTypes.DOUBLE,
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

  (SubstanceModel as any).associate = (models: Models) => {
    SubstanceModel.hasMany(models.Diagnose, { foreignKey: 'substanceID' })
  }

  return SubstanceModel
}
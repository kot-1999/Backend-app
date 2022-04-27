import { DataTypes, Model, Sequelize } from "sequelize";
import { UserRole } from "../../enums";
import Users from "../../api/v1/users";
import { Models, models } from "../index";


export class UserModel extends Model{
  id: number
  name: string
  token: string
  role: string
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
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
        allowNull: false
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

  return UserModel
}


// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { DataTypes, Model, Sequelize } from "sequelize";
import { Application } from "../declarations";
import { ModelsCollection } from "./model";

export class User extends Model {
  public id!: number;
  public name!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function(app: Application) {
  const sequelize: Sequelize = app.get("sequelizeClient");
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "users",
      sequelize
    }
  );

  const users: any = sequelize.models.User;

  users.associate = function(models: ModelsCollection) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
}

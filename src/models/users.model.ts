// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { DataTypes, Model, Sequelize } from "sequelize";
import { Application } from "../declarations";
import { ModelsCollection } from "./model";
import { LocalStrategy } from "@feathersjs/authentication-local/lib";

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
      sequelize,
      tableName: "users"
    }
  );

  const users: any = sequelize.models.User;

  users.associate = function(models: ModelsCollection) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  users.populate = function() {
    const authService = app.defaultAuthentication();

    if (!authService || typeof authService.getStrategies !== "function") {
      console.error(
        "Could not find an authentication service to hash password"
      );
    }

    const [localStrategy] = authService.getStrategies(
      "local"
    ) as LocalStrategy[];

    if (!localStrategy || typeof localStrategy.hashPassword !== "function") {
      console.error("Could not find 'local' strategy to hash password");
    }

    localStrategy.hashPassword("admin", {}).then(encoded =>
      User.create({
        name: "admin",
        password: encoded
      })
        .then((u: User) => {
          console.log(
            "+ user:",
            `${u.name}:admin#${u.id}`,
            "! Don't forget to remove it ASAP"
          );
        })
        .catch(err => {
          console.error("Error creating users", err);
        })
    );
  };

  return users;
}

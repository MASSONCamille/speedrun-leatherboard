// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Sequelize,
  Model
} from "sequelize";
import { Application } from "../declarations";
import { Weapon } from "./weapons.model";

export class Quest extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getWeapon!: BelongsToGetAssociationMixin<Weapon>;
  public setWeapon!: BelongsToSetAssociationMixin<Weapon, number>;

  public readonly weapon!: Weapon;
}

export default function(app: Application) {
  const sequelize: Sequelize = app.get("sequelizeClient");
  Quest.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "quests"
    }
  );

  const quests: any = sequelize.models.Quest;

  // eslint-disable-next-line no-unused-vars
  quests.associate = function(models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    Quest.belongsTo(Weapon);
  };

  return quests;
}

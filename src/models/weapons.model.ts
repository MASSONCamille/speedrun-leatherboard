// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { Application } from "../declarations";

export class Weapon extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function(app: Application) {
  const sequelize: Sequelize = app.get("sequelizeClient");
  Weapon.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "weapons"
    }
  );

  const weapons: any = sequelize.models.Weapon;

  // eslint-disable-next-line no-unused-vars
  weapons.associate = function(models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  weapons.populate = function() {
    Promise.all(
      [
        "greatSword",
        "longSword",
        "swordAndShield",
        "dualBlades",
        "hammer",
        "huntingHorn",
        "lance",
        "gunLance",
        "switchAxe",
        "chargeBlade",
        "insectGlaive",
        "lightBowgun",
        "heavyBowgun",
        "bow"
      ].map(async wpn => {
        const w: Weapon = await Weapon.create({ name: wpn });
        console.log("+ weapon:", `${w.name}#${w.id}`);
      })
    ).catch(err => {
      console.error("Error creating weapons", err);
    });
  };

  return weapons;
}

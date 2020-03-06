// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes } from "sequelize";
import { Application } from "../declarations";

export default function(app: Application) {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const quests = sequelizeClient.define(
    "quests",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        }
      }
    }
  );

  // eslint-disable-next-line no-unused-vars
  (quests as any).associate = function(models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.quests.belongsTo(models.weapons);
  };

  return quests;
}

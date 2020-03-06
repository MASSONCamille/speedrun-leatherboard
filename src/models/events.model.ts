// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes } from "sequelize";
import { Application } from "../declarations";

export default function(app: Application) {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const events = sequelizeClient.define(
    "events",
    {
      beginDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATE,
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
  (events as any).associate = function(models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.events.belongsTo(models.quests);
  };

  return events;
}

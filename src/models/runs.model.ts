// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes } from "sequelize";
import { Application } from "../declarations";

export default function(app: Application) {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const runs = sequelizeClient.define(
    "runs",
    {
      player: {
        type: DataTypes.STRING,
        allowNull: false
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      youtubeLink: {
        type: DataTypes.STRING,
        allowNull: false
      },
      validationDate: {
        type: DataTypes.DATE,
        allowNull: true
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
  (runs as any).associate = function(models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.runs.belongsTo(models.events);
    models.runs.belongsTo(models.users, {
      foreignKey: "validationUser"
    });
  };

  return runs;
}

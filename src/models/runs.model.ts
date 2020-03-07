// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import {
  BelongsToGetAssociationMixin,
  DataTypes,
  Model,
  Sequelize,
  BelongsToSetAssociationMixin
} from "sequelize";
import { Application } from "../declarations";
import { User } from "./users.model";
import { Event } from "./events.model";
import { ModelsCollection } from "./model";

export class Run extends Model {
  public id!: string;
  public player!: string;
  public time!: number;
  public youtubeLink!: string;

  public validationDate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getValidatedBy!: BelongsToGetAssociationMixin<User>;
  public setValidatedBy!: BelongsToSetAssociationMixin<User, number>;
  public getEvent!: BelongsToGetAssociationMixin<Event>;
  public setEvent!: BelongsToSetAssociationMixin<Event, number>;

  public readonly validatedBy?: User;
  public readonly event?: Event;
}

export default function(app: Application) {
  const sequelize: Sequelize = app.get("sequelizeClient");

  Run.init(
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
      sequelize,
      tableName: "runs"
    }
  );

  const runs: any = sequelize.models.Run;

  // eslint-disable-next-line no-unused-vars
  runs.associate = function(models: ModelsCollection) {
    // const { Event, User } = models;
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    Run.belongsTo(Event);
    Run.belongsTo(User, {
      foreignKey: "validationUser"
    });
  };

  return runs;
}

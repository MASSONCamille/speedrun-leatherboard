// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import {
  Sequelize,
  DataTypes,
  Model,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin
} from "sequelize";
import { Application } from "../declarations";
import { ModelsCollection } from "./model";
import { Quest } from "./quests.model";

export class Event extends Model {
  public id!: number;
  public beginDate!: Date;
  public endDate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getQuest!: BelongsToGetAssociationMixin<Quest>;
  public setQuest!: BelongsToSetAssociationMixin<Quest, number>;

  public readonly quest!: Quest;
}

export default function(app: Application) {
  const sequelize: Sequelize = app.get("sequelizeClient");
  Event.init(
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
      sequelize,
      tableName: "events"
    }
  );

  const events: any = sequelize.models.Event;

  // eslint-disable-next-line no-unused-vars
  events.associate = function(models: ModelsCollection) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    Event.belongsTo(Quest);
  };

  return events;
}

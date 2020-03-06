"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const sequelize_1 = require("sequelize");
function default_1(app) {
    const sequelizeClient = app.get("sequelizeClient");
    const events = sequelizeClient.define("events", {
        beginDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        }
    }, {
        hooks: {
            beforeCount(options) {
                options.raw = true;
            }
        }
    });
    // eslint-disable-next-line no-unused-vars
    events.associate = function (models) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
        models.events.belongsTo(models.quests);
    };
    return events;
}
exports.default = default_1;

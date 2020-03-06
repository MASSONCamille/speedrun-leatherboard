"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const sequelize_1 = require("sequelize");
function default_1(app) {
    const sequelizeClient = app.get("sequelizeClient");
    const runs = sequelizeClient.define("runs", {
        player: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        youtubeLink: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        validationDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        }
    }, {
        hooks: {
            beforeCount(options) {
                options.raw = true;
            }
        }
    });
    // eslint-disable-next-line no-unused-vars
    runs.associate = function (models) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
        models.runs.belongsTo(models.events);
        models.runs.belongsTo(models.users, {
            foreignKey: "validationUser"
        });
    };
    return runs;
}
exports.default = default_1;

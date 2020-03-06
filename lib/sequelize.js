"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(app) {
    const mysqlConf = app.get("mysql");
    console.log(JSON.stringify({
        host: process.env.DB_HOST || "localhost",
        port: (process.env.DB_PORT && parseInt(process.env.DB_PORT)) || 3306,
        database: process.env.DB_SCHEMA || "db",
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASS
    }));
    const sequelize = new sequelize_1.Sequelize({
        dialect: "mysql",
        logging: false,
        define: {
            freezeTableName: true
        },
        host: process.env.DB_HOST || "localhost",
        port: (process.env.DB_PORT && parseInt(process.env.DB_PORT)) || 3306,
        database: process.env.DB_SCHEMA || "db",
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASS
    });
    const oldSetup = app.setup;
    app.set("sequelizeClient", sequelize);
    app.setup = function (...args) {
        const result = oldSetup.apply(this, args);
        // Set up data relationships
        const models = sequelize.models;
        Object.keys(models).forEach(name => {
            if ("associate" in models[name]) {
                models[name].associate(models);
            }
        });
        // Sync to the database
        app.set("sequelizeSync", sequelize.sync());
        return result;
    };
}
exports.default = default_1;

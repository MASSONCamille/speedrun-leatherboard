import { Sequelize } from "sequelize";
import { Application } from "./declarations";
import { User } from "./models/users.model";

export default function(app: Application) {
  const mysqlConf = app.get("mysql");

  const sequelize = new Sequelize({
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

  app.setup = function(...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ("associate" in models[name]) {
        (models[name] as any).associate(models);
      }
    });

    // Sync to the database
    app.set(
      "sequelizeSync",
      sequelize
        .sync({
          // FIXME Remove once DEV is finished
          force: true
        })
        .then(() => {
          // Populate if empty and needed
          Object.keys(models).forEach(name => {
            if ("populate" in models[name]) {
              models[name].count().then(count => {
                if (count === 0) {
                  console.log(
                    `${name} is empty but has populate field: populating...`
                  );
                  (models[name] as any).populate();
                }
              });
            }
          });
        })
    );

    return result;
  };
}

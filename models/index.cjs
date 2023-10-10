"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.cjs")[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
   sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
   sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
   );
}

fs.readdirSync(__dirname)
   .filter((file) => {
      return (
         file.indexOf(".") !== 0 &&
         file !== basename &&
         file.slice(-3) === ".js"
      );
   })
   .forEach((file) => {
      const model = require(path.join(__dirname, file))(
         sequelize,
         Sequelize.DataTypes
      );
      db[model.name] = model;
   });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.billing = require("./billing.cjs")(sequelize, Sequelize);
db.building = require("./building.cjs")(sequelize, Sequelize);
db.complain = require("./complain.cjs")(sequelize, Sequelize);
db.contract = require("./contract.cjs")(sequelize, Sequelize);
db.request = require("./request.cjs")(sequelize, Sequelize);
db.roomCategory = require("./room-category.cjs")(sequelize, Sequelize);
db.room = require("./room.cjs")(sequelize, Sequelize);
db.token = require("./token.cjs")(sequelize, Sequelize);
db.user = require("./user.cjs")(sequelize, Sequelize);
Object.keys(db).forEach((modelName) => {
   if (db[modelName].associate) {
      db[modelName].associate(db);
   }
});
module.exports = db;

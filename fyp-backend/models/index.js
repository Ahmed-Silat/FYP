// "use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import process from "process";
import Company from "./company/Company.js";
import User from "./UserAuth/User.js";

import Job from "./Job/Job.js";
import Question from "./Questions/Question.js";

// import configFile from "../config/config.json";

const env = process.env.NODE_ENV || "development";
// const config = configFile[env];

// const basename = path.basename(__filename);
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       file.indexOf(".test.js") === -1
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// Associations
Company.hasMany(User, {
  foreignKey: "company_id",
  onUpdate: "CASCADE",
  onDelete: "SET NULL", // or CASCADE if you want all users deleted when company is deleted
});

User.belongsTo(Company, {
  foreignKey: "company_id",
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});

Job.hasMany(Question, {
  foreignKey: "job_id",
  as: "questions",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

Question.belongsTo(Job, {
  foreignKey: "job_id",
  as: "job",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});


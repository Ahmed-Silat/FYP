// models/Company.js
import { DataTypes } from "sequelize";
import db from "../../models/db.js";

const Company = db.define("Company", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: "companies",
});

export default Company;

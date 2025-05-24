// models/Company.js
import { DataTypes } from "sequelize";
import db from "../db.js";

const Company = db.define(
  "Company",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "companies",
  }
);

export default Company;

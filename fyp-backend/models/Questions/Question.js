// models/Company.js
import { DataTypes } from "sequelize";
import db from "../db.js";

const Questions = db.define(
  "Questions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question_01: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question_02: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question_03: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "questions",
  }
);

export default Questions;

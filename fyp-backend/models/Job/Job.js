// models/Company.js
import { DataTypes } from "sequelize";
import db from "../db.js";

const Job = db.define(
  "Job",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "questions",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // Or "CASCADE", "RESTRICT", etc.
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // Or "CASCADE", "RESTRICT", etc.
    },
  },
  {
    tableName: "jobs",
  }
);

export default Job;

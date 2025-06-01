// models/Question.js
import { DataTypes } from "sequelize";
import db from "../../db.js";

const CandidateApplication = db.define(
  "CandidateApplication",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    application_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "jobs",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    tableName: "candidateApplications",
    timestamps: true, // Enables createdAt and updatedAt
  }
);

export default CandidateApplication;

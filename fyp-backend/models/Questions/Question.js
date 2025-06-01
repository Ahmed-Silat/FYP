// models/Question.js
import { DataTypes } from "sequelize";
import db from "../../db.js";

const Question = db.define(
  "Question",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "questions",
    timestamps: true, // Enables createdAt and updatedAt
  }
);

export default Question;

// models/Question.js
import { DataTypes } from "sequelize";
import db from "../../db.js";

const Video = db.define(
  "Video",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    video_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "questions",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
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
  },
  {
    tableName: "videos",
    timestamps: true, // Enables createdAt and updatedAt
  }
);

export default Video;

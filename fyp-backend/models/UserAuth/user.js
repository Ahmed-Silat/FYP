import { DataTypes } from "sequelize";
import db from "../db.js";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firebase_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "companies", // Must match your Company table name
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // Or "CASCADE", "RESTRICT", etc.
    },
  },
  {
    timestamps: true, // This enables createdAt and updatedAt
    tableName: "users", // Explicitly set table name
  }
);

export default User;

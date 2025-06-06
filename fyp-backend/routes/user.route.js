// const express = require('express');
import express from "express";
// const userController = require('../controllers/userController');
// const { createUser } = require('../controllers/Auth/auth.controller');
import {
  createUser,
  deleteUser,
  getUserByFirebaseId,
  getUserById,
  getUserByRole,
  updateUser,
} from "../controllers/Auth/auth.controller.js";

const router = express.Router();

// POST /api/users
router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/getUserById/:id", getUserById);
router.get("/getUserByRole", getUserByRole);
router.get("/getUserByFirebaseId/:firebase_id", getUserByFirebaseId);

export default router;

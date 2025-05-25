// const express = require('express');
import express from "express";
// const userController = require('../controllers/userController');
// const { createUser } = require('../controllers/Auth/auth.controller');
import {
  createUser,
  deleteUser,
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
router.get("/getUserByRole/:role", getUserByRole);

export default router;

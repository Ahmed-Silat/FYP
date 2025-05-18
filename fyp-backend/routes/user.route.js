// const express = require('express');
import express from 'express';
// const userController = require('../controllers/userController');
// const { createUser } = require('../controllers/Auth/auth.controller');
import { createUser } from '../controllers/Auth/auth.controller.js';

const router = express.Router();

// POST /api/users
router.post('/', createUser);

export default router;
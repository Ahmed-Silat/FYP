// const express = require('express');
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Basic route
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
app.use("/user", userRoutes);
app.use("/company", companyRoutes);
// User route
import userRoutes from './routes/user.route.js';
app.use('/api/users', userRoutes);

// Question route
import questionRoutes from './routes/question.route.js';
app.use('/api/questions', questionRoutes);

// Job route
import jobRoutes from './routes/job.route.js';
app.use('/api/job', jobRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const db = require('./models/db');
import db from "./models/db.js"; // Adjust the path as necessary

// Test connection
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// After db.authenticate()
// db.sync({ force: true }) // Drops all tables and recreates them
//   .then(() => console.log("Database synced"))
//   .catch((err) => console.error("Sync failed:", err));

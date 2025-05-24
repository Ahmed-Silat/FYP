// const express = require('express');
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// User route
import userRoutes from "./routes/user.route.js";
app.use("/user", userRoutes);

// Company route
import companyRoutes from "./routes/company.route.js";
app.use("/company", companyRoutes);

// Question route
import questionRoutes from "./routes/question.route.js";
app.use("/api/questions", questionRoutes);

// Job route
import jobRoutes from "./routes/job.route.js";
app.use("/api/job", jobRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import db from "./models/db.js"; // Adjust the path as necessary

// Test connection
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

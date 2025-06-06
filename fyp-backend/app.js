// const express = require('express');
import express from "express";
import "./models/index.js"; // Import models to ensure they are registered
import db from "./db.js";
const app = express();
const PORT = process.env.PORT || 3000;
import cors from "cors";

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Cors
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// User route
import userRoutes from "./routes/user.route.js";
app.use("/user", userRoutes);

// Company route
import companyRoutes from "./routes/company.route.js";
app.use("/company", companyRoutes);

// Job route
import jobRoutes from "./routes/job.route.js";
app.use("/job", jobRoutes);

// Video route
import videoRoutes from "./routes/video.route.js";
app.use("/videos", videoRoutes);

// Candidate Application route
import candidateApplicationRoutes from "./routes/candidateApplication.route.js";
app.use("/applications", candidateApplicationRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Adjust the path as necessary

// Test connection
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

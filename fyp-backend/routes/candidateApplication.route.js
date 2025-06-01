import express from "express";
import {
  createCandidateApplication,
  getAllCandidateApplications,
  getApplicationsByUserId,
  updateCandidateApplication,
} from "../controllers/CandidateApplication/CandidateApplication.controller.js";

const router = express.Router();

router.post("/create", createCandidateApplication);
router.put("/updateApplication/:id", updateCandidateApplication);
router.get("/getAll", getAllCandidateApplications);
router.get("/getByUserId/:userId", getApplicationsByUserId);

export default router;

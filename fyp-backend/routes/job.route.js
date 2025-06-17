import express from "express";
import {
  createJobWithQuestions,
  getAllJobsWithQuestions,
  updateJobWithQuestions,
  deleteJobWithQuestions,
  getJobsByUserId,
  getUnappliedJobsByUserId,
} from "../controllers/Job/job_questions.controller.js";

const router = express.Router();

router.post("/createJobs", createJobWithQuestions);
router.get("/getJobs", getAllJobsWithQuestions);
router.put("/:id", updateJobWithQuestions);
router.delete("/:id", deleteJobWithQuestions);
router.get("/user/:userId", getJobsByUserId);
router.get("/unappliedJobsByUser/:userId", getUnappliedJobsByUserId);

export default router;

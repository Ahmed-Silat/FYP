import express from 'express';
import {
  createJobWithQuestions,
  getAllJobsWithQuestions,
  updateJobWithQuestions,
  deleteJobWithQuestions
} from '../controllers/Job/job_questions.controller.js';

const router = express.Router();

router.post("/job-with-questions", createJobWithQuestions);
router.get("/", getAllJobsWithQuestions);
router.put('/:id', updateJobWithQuestions);
router.delete('/:id', deleteJobWithQuestions);

export default router;

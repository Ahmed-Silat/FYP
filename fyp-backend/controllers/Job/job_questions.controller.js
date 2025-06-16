// controllers/jobController.js
import Job from "../../models/Job/Job.js";
import Question from "../../models/Questions/Question.js";
import User from "../../models/UserAuth/user.js";

import Company from "../../models/Company/Company.js";

import db from "../../db.js";

export const createJobWithQuestions = async (req, res) => {
  const { job, questions } = req.body;

  // Validate input
  if (
    !job ||
    !questions ||
    !Array.isArray(questions) ||
    questions.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Job and at least one question are required." });
  }

  const { job_title, job_description, skills, user_id } = job;

  // Validate skills exists and is not empty
  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({ error: "At least one skill is required." });
  }

  const transaction = await db.transaction();

  try {
    // Filter out empty skills
    const filteredSkills = skills
      .map((skill) => String(skill).trim())
      .filter((skill) => skill);

    const newJob = await Job.create(
      {
        job_title,
        job_description,
        skills: filteredSkills,
        user_id,
      },
      { transaction }
    );

    // Create questions
    const createdQuestions = await Promise.all(
      questions.map((q) =>
        Question.create(
          {
            question: q.question || q, // Handle both object and string
            job_id: newJob.id,
          },
          { transaction }
        )
      )
    );

    await transaction.commit();

    res.status(201).json({
      message: "Job and questions created successfully",
      job: {
        ...newJob.toJSON(),
        skills: filteredSkills,
      },
      questions: createdQuestions,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error details:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

// Get all jobs with their questions
// export const getAllJobsWithQuestions = async (req, res) => {
//   try {
//     const jobs = await Job.findAll({
//       include: [{ model: Question, as: "questions" }],
//     });
//     res.json(jobs);
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     res.status(500).json({ error: "Failed to fetch jobs" });
//   }
// };

export const getAllJobsWithQuestions = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: [
        { 
          model: Question, 
          as: "questions" 
        },
        {
          model: User,
          as: "user",
          attributes: ['id', 'full_name', 'email'],
          include: [{
            model: Company,
            as: "company",
            attributes: ['id', 'company_name']
          }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    // Format the response to include all necessary data
    const formattedJobs = jobs.map(job => ({
      ...job.toJSON(),
      user: job.user ? {
        ...job.user.toJSON(),
        company: job.user.company ? job.user.company.toJSON() : null
      } : null
    }));

    res.json({
      success: true,
      count: jobs.length,
      data: formattedJobs
    });
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch jobs",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update Job and its Questions
export const updateJobWithQuestions = async (req, res) => {
  const jobId = req.params.id;
  const { job, questions } = req.body;

  const transaction = await db.transaction();

  try {
    // Update the job
    await Job.update(
      {
        job_title: job.job_title,
        job_description: job.job_description,
        skills: job.skills,
        user_id: job.user_id,
      },
      {
        where: { id: jobId },
        transaction,
      }
    );

    // Delete existing questions for this job
    await Question.destroy({ where: { job_id: jobId }, transaction });

    // Create new questions
    await Promise.all(
      questions.map((q) =>
        Question.create(
          {
            question: q.question,
            job_id: jobId,
          },
          { transaction }
        )
      )
    );

    await transaction.commit();

    // Fetch the complete updated job with questions
    const updatedJob = await Job.findByPk(jobId, {
      include: [{ model: Question, as: "questions" }],
    });

    res.status(200).json({
      message: "Job and questions updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating job:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const deleteJobWithQuestions = async (req, res) => {
  const jobId = req.params.id;

  const transaction = await db.transaction();

  try {
    // Delete related questions
    await Question.destroy({ where: { job_id: jobId }, transaction });

    // Try to delete the job
    const deletedJobCount = await Job.destroy({
      where: { id: jobId },
      transaction,
    });

    if (deletedJobCount === 0) {
      // No job was deleted
      await transaction.rollback();
      return res.status(404).json({ error: "Job not found" });
    }

    // Commit if job was found and deleted
    await transaction.commit();
    res
      .status(200)
      .json({ message: "Job and related questions deleted successfully" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error deleting job:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

// Get all jobs by user ID
export const getJobsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const jobs = await Job.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Question,
          as: "questions", // only if you have the association set with alias
        },
      ],
    });

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this user." });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs by user ID:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

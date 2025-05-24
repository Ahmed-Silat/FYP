import Job from "../models/Job/Job.js";

export const createJob = async (req, res) => {
  try {
    const { job_title, job_description, skills, question_id, user_id } =
      req.body;

    if (!job_title || !job_description || !skills || !question_id || !user_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newJob = await Job.create({
      job_title,
      job_description,
      skills,
      question_id,
      user_id,
    });

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch jobs", details: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch job", details: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    await job.update(req.body);

    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update job", details: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    await job.destroy();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete job", details: error.message });
  }
};

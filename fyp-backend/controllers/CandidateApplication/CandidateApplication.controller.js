import { Sequelize } from "sequelize";
import CandidateApplication from "../../models/CandidateApplication/CandidateApplication.js";
import Job from "../../models/Job/Job.js";
import User from "../../models/UserAuth/user.js";
import Company from "../../models/Company/Company.js";

export const createCandidateApplication = async (req, res) => {
  try {
    const { score, application_status, user_id, job_id } = req.body;

    // Basic validation (optional)
    if (!application_status || !user_id || !job_id) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const newApplication = await CandidateApplication.create({
      score, // optional, allowNull: true
      application_status,
      user_id,
      job_id,
    });

    return res
      .status(201)
      .json({ message: "Candidate Application created successfully" });
  } catch (error) {
    console.error("Create CandidateApplication error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCandidateApplication = async (req, res) => {
  const { id } = req.params;
  const { score, application_status, job_id } = req.body;

  try {
    const application = await CandidateApplication.findByPk(id);

    if (!application) {
      return res
        .status(404)
        .json({ message: "Candidate application not found." });
    }

    // Update allowed fields
    application.score = score ?? application.score;
    application.application_status =
      application_status ?? application.application_status;
    application.job_id = job_id ?? application.job_id;

    await application.save();

    res.status(200).json({
      message: "Candidate application updated successfully.",
      application,
    });
  } catch (error) {
    console.error("Error updating candidate application:", error);
    res.status(500).json({ error: "Failed to update candidate application." });
  }
};

export const getAllCandidateApplications = async (req, res) => {
  try {
    const applications = await CandidateApplication.findAll({
      include: [
        {
          model: User,
          required: true,
          attributes: ['id', 'full_name', 'email'] 
        },
        {
          model: Job,
          required: true,
          include: [
            {
              model: User,
              as: 'user', 
              attributes: ['id', 'full_name', 'email'], 
              include: [
                {
                  model: Company,
                  attributes: ['id', 'company_name'] 
                }
              ]
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']] // Order by creation date (newest first)
    });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching candidate applications:", error);
    res.status(500).json({ 
      error: "Failed to fetch candidate applications",
      details: error.message 
    });
  }
};

export const getJobApplicationCounts = async (req, res) => {
  try {
    const applications = await CandidateApplication.findAll({
      attributes: [
        "job_id",
        [
          Sequelize.fn("COUNT", Sequelize.col("CandidateApplication.id")),
          "applicantCount",
        ],
      ],
      include: [
        {
          model: Job,
          attributes: ["job_title", "createdAt"], // ✅ include job creation date
          required: true,
        },
      ],
      group: [
        "CandidateApplication.job_id",
        "Job.id",
        "Job.job_title",
        "Job.createdAt",
      ],
    });

    const result = applications.map((app) => ({
      jobId: app.job_id,
      jobTitle: app.Job.job_title,
      applicantCount: parseInt(app.getDataValue("applicantCount"), 10),
      createdAt: app.Job.createdAt, // ✅ include createdAt
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching job application counts:", error);
    res.status(500).json({ error: "Failed to fetch application stats" });
  }
};

export const getApplicationsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const applications = await CandidateApplication.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          required: true,
        },
        {
          model: Job,
          required: true,
          include: [
            {
              model: User,
              as: 'user',  
              required: true,
              include: [
                {
                  model: Company,
                  as: 'company',  
                  required: false,
                }
              ]
            }
          ]
        },
      ],
    });

      if (applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for this user." });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications by user ID:", error);
    res.status(500).json({ error: "Failed to fetch applications." });
  }
};


export const getCandidatesWithApplicationCount = async (req, res) => {
  try {
    const candidates = await User.findAll({
      where: { role: "candidate" },
      attributes: ["id", "full_name", "email"],
    });

    const result = await Promise.all(
      candidates.map(async (candidate) => {
        const count = await CandidateApplication.count({
          where: { user_id: candidate.id },
        });

        return {
          id: candidate.id, // ✅ include ID here
          name: candidate.full_name,
          email: candidate.email,
          appliedJobsCount: count,
        };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching candidate applications:", error);
    res.status(500).json({ error: "Server error" });
  }
};

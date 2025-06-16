import axios from "axios";

const EXPRESS_API_URL = import.meta.env.VITE_EXPRESS_API_URL;

export const createJobWithQuestions = async (job, questions) => {
  if (!job || !job.job_title || !job.job_description || !job.user_id) {
    throw new Error("All job fields are required.");
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("At least one question is required.");
  }

  if (!Array.isArray(job.skills)) {
    throw new Error("Skills must be provided as an array");
  }

  const payload = {
    job: {
      job_title: job.job_title,
      job_description: job.job_description,
      skills: job.skills,
      user_id: job.user_id,
    },
    questions: questions,
  };

  try {
    const { data } = await axios.post(
      `${EXPRESS_API_URL}/job/createJobs`,
      payload
    );

    return data;
  } catch (error) {
    console.error(
      "Error creating job with questions:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchJobs = async (userId) => {
  try {
    const { data } = await axios.get(`${EXPRESS_API_URL}/job/getJobs`, {
      params: {
        user_id: userId,
        include_questions: true,
      },
    });

    return data.map((job) => ({
      ...job,
      skills: Array.isArray(job.skills) ? job.skills : [],
      questions: job.questions || [],
    }));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const updateJobWithQuestions = async (jobId, jobData, questions) => {
  try {
    if (!Array.isArray(jobData.skills)) {
      throw new Error("Skills must be provided as an array");
    }

    const payload = {
      job: {
        job_title: jobData.job_title,
        job_description: jobData.job_description,
        skills: jobData.skills,
        user_id: jobData.user_id,
      },
      questions: questions.map((q) =>
        typeof q === "string" ? { question: q } : q
      ),
    };

    const { data } = await axios.put(
      `${EXPRESS_API_URL}/job/${jobId}`,
      payload
    );

    return data;
  } catch (error) {
    console.error("Error updating job:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteJob = async (jobId) => {
  try {
    await axios.delete(`${EXPRESS_API_URL}/job/${jobId}`);
  } catch (error) {
    console.error("Error deleting job:", error.response?.data || error.message);
    throw error;
  }
};

import axios from "axios";

const EXPRESS_API_URL = import.meta.env.VITE_EXPRESS_API_URL;

export const getJobApplicationCounts = async () => {
  const { data } = await axios.get(
    `${EXPRESS_API_URL}/applications/getJobApplicationsCount`
  );
  return data;
};

export const getCandidatesWithApplicationCount = async () => {
  const { data } = await axios.get(
    `${EXPRESS_API_URL}/applications/candidatesWithJobCount`
  );
  return data;
};

export const createCandidateApplication = async (
  score,
  application_status,
  user_id,
  job_id
) => {
  const { data } = await axios.post(`${EXPRESS_API_URL}/applications/create`, {
    score,
    application_status,
    user_id,
    job_id,
  });
  return data;
};
export const getApplicationsByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${EXPRESS_API_URL}/applications/getByUserId/${userId}`
    );
    return response.data || []; // Return empty array if response.data is falsy
  } catch (error) {
    // Only throw error if it's not a 404
    if (error.response && error.response.status !== 404) {
      console.error("API error:", error);
      throw error;
    }
    return []; // Return empty array for 404 errors
  }
};


// In your API client file
export const getAllCandidateApplications = async () => {
  try {
    const { data } = await axios.get(
      `${EXPRESS_API_URL}/applications/getAll`
    );
    return data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

// Add this to your existing API client file (where you have other API calls)
export const updateCandidateApplication = async (id, updateData) => {
  try {
    const { data } = await axios.put(
      `${EXPRESS_API_URL}/applications/updateApplication/${id}`,
      updateData
    );
    return data;
  } catch (error) {
    console.error("Error updating application:", error);
    throw error;
  }
};
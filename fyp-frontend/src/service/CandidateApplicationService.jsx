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
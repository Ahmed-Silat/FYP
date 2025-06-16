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

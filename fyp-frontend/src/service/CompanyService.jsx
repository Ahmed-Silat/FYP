import axios from "axios";

const EXPRESS_API_URL = import.meta.env.VITE_EXPRESS_API_URL;

export const getAllCompanies = async () => {
  try {
    const { data } = await axios.get(`${EXPRESS_API_URL}/company/getAll`);
    return data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

export const createCompany = async (companyName) => {
  try {
    const { data } = await axios.post(`${EXPRESS_API_URL}/company/create`, {
      company_name: companyName,
    });
    return data;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

export const updateCompany = async (companyId, companyName) => {
  try {
    const { data } = await axios.put(
      `${EXPRESS_API_URL}/company/update/${companyId}`,
      {
        company_name: companyName,
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};

export const deleteCompany = async (companyId) => {
  try {
    const { data } = await axios.delete(
      `${EXPRESS_API_URL}/company/delete/${companyId}`
    );
    return data;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
};

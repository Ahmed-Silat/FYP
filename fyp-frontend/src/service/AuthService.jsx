import axios from "axios";

const EXPRESS_API_URL = import.meta.env.VITE_EXPRESS_API_URL;
// console.log({ EXPRESS_API_URL });

export const login = async (firebaseId) => {
  const { data } = await axios.get(
    `${EXPRESS_API_URL}/user/getUserByFirebaseId/${firebaseId}`
  );
  return data;
};

export const signup = async (
  firebaseId,
  full_name,
  email,
  role,
  company_id
) => {
  const { data } = await axios.post(`${EXPRESS_API_URL}/user/create`, {
    firebase_id: firebaseId,
    full_name,
    email,
    role,
    company_id,
  });
  console.log("user signup successful");
  return data;
};

import axios from "axios";

const EXPRESS_API_URL = import.meta.env.VITE_EXPRESS_API_URL;

export const uploadVideo = async (question_id, user_id, file) => {
  const formData = new FormData();
  formData.append("video", file); // required for multer
  formData.append("question_id", question_id);
  formData.append("user_id", user_id);

  const { data } = await axios.post(
    `${EXPRESS_API_URL}/videos/create`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

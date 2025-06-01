import Question from "../../models/Questions/Question.js";
import Video from "../../models/Videos/Video.js";

export const uploadVideo = async (req, res) => {
  try {
    const { video_link, question_id, user_id } = req.body;

    if (!video_link || !question_id || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newVideo = await Video.create({
      video_link,
      question_id,
      user_id,
    });

    return res.status(201).json({ message: "Video uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      include: [
        {
          model: Question,
          required: true, // INNER JOIN, remove if you want LEFT JOIN
        },
      ], // Optional: latest first
    });

    return res.status(200).json({
      message: "Videos fetched successfully",
      videos,
    });
  } catch (error) {
    console.error("Get Videos Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

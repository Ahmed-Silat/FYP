import Question from "../../models/Questions/Question.js";
import Video from "../../models/Videos/Video.js";

export const uploadVideo = async (req, res) => {
  try {
    console.log("📝 req.body:", req.body);
    console.log("📦 req.file:", req.file);

    const { question_id, user_id } = req.body;
    const file = req.file;

    if (!file || !question_id || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const video_link = `/videos/${file.filename}`;
    const newVideo = await Video.create({
      video_link,
      question_id,
      user_id,
    });

    return res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("❌ Upload error:", error); // log full stack trace
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      order: [["createdAt", "DESC"]], // latest first
      include: [
        {
          model: Question,
          attributes: ["id", "question"], // Select only useful fields
          required: true, // use false for LEFT JOIN
        },
      ],
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

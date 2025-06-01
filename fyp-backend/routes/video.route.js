import express from "express";
import {
  getAllVideos,
  uploadVideo,
} from "../controllers/Video/Video.controller.js";

const router = express.Router();

router.post("/create", uploadVideo);
router.get("/getAllVideos", getAllVideos);

export default router;

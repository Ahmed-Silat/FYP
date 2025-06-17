import express from "express";

import {
  uploadVideo,
  getAllVideos,
} from "../controllers/Video/Video.controller.js";
import upload from "./Middlewares/upload.js";

const router = express.Router();

router.post("/create", upload.single("video"), uploadVideo);
router.get("/getAllVideos", getAllVideos);

export default router;

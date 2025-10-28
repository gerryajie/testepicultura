import express from "express";
import { getMeetings, createMeeting } from "../controllers/meetingControllers.js";

const router = express.Router();

router.get("/", getMeetings);
router.post("/", createMeeting);

export default router;

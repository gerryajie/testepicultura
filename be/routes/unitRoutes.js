// routes/unitRoutes.js
import express from "express";
import { getUnits } from "../controllers/unitController.js";

const router = express.Router();

router.get("/", getUnits);

export default router;

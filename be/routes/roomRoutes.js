import express from "express";
import { getRooms, createRoom } from "../controllers/roomController.js";

const router = express.Router();

// 🔹 GET semua ruangan
router.get("/api/rooms", getRooms);

// 🔹 POST tambah ruangan baru
router.post("/api/rooms", createRoom);

export default router;

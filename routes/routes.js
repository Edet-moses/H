import express from "express";
import { roomtype, Rooms, getRoomById, getRooms, updateRoom, deleteRoom, searchRooms } from "../controllers/RoomController.js";

const router = express.Router();

router.get("/api/v1/rooms-types", getRooms);
router.get("/api/v1/rooms", searchRooms);
router.post("/api/v1/rooms", Rooms);
router.post("/api/v1/rooms-types", roomtype);
router.get("/api/v1/rooms/:id", getRoomById);
router.patch("/api/v1/rooms/:id", updateRoom);
router.delete("/api/v1/rooms/:id", deleteRoom);

export default router;

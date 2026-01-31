import express from "express";
import { moveProperty, getHistory } from "../controllers/custody.controller.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/move", protect, moveProperty);
router.get("/history/:propertyId", protect, getHistory);

export default router;
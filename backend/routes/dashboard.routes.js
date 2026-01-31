import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);

export default router;
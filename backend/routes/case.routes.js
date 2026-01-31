import express from "express";


import { upload } from "../middlewares/upload.js";
import { createCaseWithProperties, getAllCases, getCaseDetails } from "../controllers/case.controller.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();


router.post("/create", protect, upload.array("images"), createCaseWithProperties);
router.get("/all", protect, getAllCases);
router.get("/:id", protect, getCaseDetails);
export default router;
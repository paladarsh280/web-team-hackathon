import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

const app = express();
console.log("RESEND KEY:", process.env.RESEND_API_KEY);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

export default app;

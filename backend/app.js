import express from "express";
import cors from "cors";
import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.routes.js";
import caseRoutes from "./routes/case.routes.js";
import custodyRoutes from "./routes/custody.routes.js";
const app = express();
console.log("RESEND KEY:", process.env.RESEND_API_KEY);
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/cases", caseRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/custody", custodyRoutes);
export default app;

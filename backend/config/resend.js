import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config(); // ✅ now this WILL find .env

const resend = new Resend(process.env.RESEND_API_KEY);

// Optional debug (remove later)
// console.log("RESEND KEY:", process.env.RESEND_API_KEY);

export default resend;

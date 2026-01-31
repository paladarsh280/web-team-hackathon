import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();
console.log("RESEND KEY:", process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (email, otp) => {
  await resend.emails.send({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Your OTP Verification Code",
    html: `
      <h2>Email Verification OTP</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `,
  });
};

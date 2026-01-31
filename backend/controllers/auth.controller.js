
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../utils/sendEmail.js";


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });


    if (user && user.isVerified) {
      return res.status(400).json({ message: "User already exists" });
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString();


    if (user && !user.isVerified) {
      user.otp = otp;
      user.otpExpire = Date.now() + 5 * 60 * 1000;
      await user.save();

      await sendOtpEmail(email, otp);

      return res.json({ message: "OTP resent to email" });
    }


    user = await User.create({
      name,
      email,
      password,
      otp,
      otpExpire: Date.now() + 5 * 60 * 1000,
    });

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (!user.otp || !user.otpExpire)
      return res.status(400).json({ message: "OTP not requested" });

    if (user.otpExpire < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    if (String(user.otp) !== String(otp))
      return res.status(400).json({ message: "Invalid OTP" });

    // ✅ Verify user
    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    res.json({
      message: "Account verified successfully",
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OTP verification failed" });
  }
};


export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP resent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Resend OTP failed" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Email not verified",
        code: "EMAIL_NOT_VERIFIED",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

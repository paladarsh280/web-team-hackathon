
import React, { useState } from "react";
import img1 from "../../images/signupbg.jpg";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // INPUT HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // STEP 1 — SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailValid) {
      alert("Enter a valid email");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("OTP sent to your email");
      setStep(2);
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 — VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid OTP");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      navigate("/");
    } catch {
      alert("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const resendOtp = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      alert("OTP resent");
    } catch {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${img1})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-xl bg-white/95 rounded-2xl shadow-xl p-6">

          <h1 className="text-2xl font-semibold text-centerc text-black text-center">Join Us</h1>
          <p className="text-sm text-center mt-2 mb-6 text-black">
            Create account & verify via OTP
          </p>

          {/* STEP 1 */}
          {step === 1 && (
            <form className="space-y-4" onSubmit={handleSignup}>
              <div className="flex gap-3">
                <input
                  name="firstName"
                  placeholder="First Name"
                  className="input w-1/2 text-black"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  className="input w-1/2 text-black"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input w-full text-black"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input w-full text-black"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
              />

              <button
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg"
              >
                {loading ? "Sending OTP..." : "Create Account"}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form className="space-y-4" onSubmit={handleVerifyOtp}>
              <input
                placeholder="Enter OTP"
                className="input w-full text-black"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              <button
                disabled={loading}
                className="w-full bg-black  py-3 rounded-lg text-white"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                type="button"
                onClick={resendOtp}
                className="text-sm underline w-full"
              >
                Resend OTP
              </button>
            </form>
          )}

          <p className="text-sm text-center mt-6 text-black">
            Already have an account?{" "}
            <span
              className="cursor-pointer font-medium underline text-black"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

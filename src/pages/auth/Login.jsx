
import React, { useState } from "react";
import img1 from "../../images/signupbg.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function Login() {
  const navigate = useNavigate();
  const { saveAuthToken } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailValid) {
      alert("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // ✅ Email not verified → redirect to OTP
        if (data?.message?.toLowerCase().includes("not verified")) {
          alert("Email not verified. OTP resent.");

          localStorage.setItem("pendingEmail", form.email);
          navigate("/signup");
          return;
        }

        alert(data.message || "Login failed");
        return;
      }


      localStorage.removeItem("pendingEmail");
      localStorage.setItem("role", data.role);


      saveAuthToken(data.token);

      navigate("/demo");

    } catch {
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${img1})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-xl p-6">

          <h1 className="text-2xl font-semibold text-center text-black">Welcome Back</h1>
          <p className="text-sm text-center mt-2 mb-6 text-black">Login here</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
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
              required
            />



            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg disabled:opacity-50 text-black"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6 text-black">
            Don’t have an account?{" "}
            <span
              className="font-medium cursor-pointer hover:underline text-black"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}



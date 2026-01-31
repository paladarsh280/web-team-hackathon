
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Demo from "./pages/demo";
import Footer from "./components/Footer";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Public Pages */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* ✅ Protected Pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/demo" element={<Demo />} />
          <Route path="/footer" element={<Footer />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;


import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";


import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";


import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { AuthProvider } from "./context/AuthContext";

import Demo from "./pages/evidence/Demo";

import AddCase from "./pages/cases/AddCase";
import CaseList from "./pages/cases/CaseList";
import CaseDetails from "./pages/cases/CaseDetails";
import CustodyManager from "./pages/evidence/CustodyManager";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

         
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route path="/demo" element={<Demo />} />

         
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="add-case" element={<AddCase />} />
              <Route path="search" element={<CaseList />} />
              <Route path="cases/:id" element={<CaseDetails />} />
              <Route path="custody" element={<CustodyManager />} />
            </Route>
          </Route>

       
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
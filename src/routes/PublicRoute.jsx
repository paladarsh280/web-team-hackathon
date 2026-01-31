import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute() {
  const { token, loading } = useAuth();


  if (loading) {
    return <div></div>;
  }


  if (token) {
    return <Navigate to="/dashboard" replace />;
  }


  return <Outlet />;
}
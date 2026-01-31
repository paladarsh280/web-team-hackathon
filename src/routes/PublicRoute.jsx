import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to="/demo" replace /> : <Outlet />;
};

export default PublicRoute;



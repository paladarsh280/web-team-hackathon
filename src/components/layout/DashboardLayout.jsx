
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-screen bg-slate-50">

      <Sidebar />

      <div className="w-full lg:ml-64 flex-1 flex flex-col">




        <div className="flex-1 p-4 sm:p-6 lg:p-8 pt-20 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
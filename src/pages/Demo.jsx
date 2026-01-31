import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function Demo() {
 const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-gray-100">
<Navbar/>
      <h1 className="text-2xl text-red-600">here login is done</h1>
      <button onClick={() => navigate("/footer")}>
        click
      </button>
    </div>
  );
}

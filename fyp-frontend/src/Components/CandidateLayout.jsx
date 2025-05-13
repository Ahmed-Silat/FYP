// src/Layouts/CandidateLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

const CandidateLayout = () => {
  const candidateLinks = [
    {
      to: "/candidate/dashboard",
      label: "Dashboard",
      icon: <MdDashboard size={24} />,
    },
    {
      to: "/candidate/results",
      label: "Results",
      icon: <FaRegFileAlt size={22} />,
    },
    {
      to: "/candidate/profile",
      label: "Profile",
      icon: <CiSettings size={24} />,
    },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar links={candidateLinks} />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default CandidateLayout;

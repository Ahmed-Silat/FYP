import React from "react";
import { CiSettings } from "react-icons/ci";
import { FaRegFileAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

const HrLayout = () => {
  const hrLinks = [
    {
      to: "/hr/dashboard",
      label: "Dashboard",
      icon: <MdDashboard size={24} />,
    },
    {
      to: "/hr/responses",
      label: "Responses",
      icon: <FaRegFileAlt size={22} />,
    },
    {
      to: "/hr/profile",
      label: "Profile",
      icon: <CiSettings size={24} />,
    },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar links={hrLinks} />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default HrLayout;

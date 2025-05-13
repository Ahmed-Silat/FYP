import React from "react";
import Sidebar from "./Sidebar";
import { RxPerson } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { Outlet } from "react-router";

const AdminLayout = () => {
  const adminLinks = [
    {
      to: "/admin/dashboard",
      label: "Dashboard",
      icon: <MdDashboard size={24} />,
    },
    {
      to: "/admin/hr-management",
      label: "HR Management",
      icon: <RxPerson size={24} />,
    },
    {
      to: "/admin/candidates",
      label: "Candidates",
      icon: <FaRegFileAlt size={22} />,
    },
    {
      to: "/admin/profile",
      label: "Profile",
      icon: <CiSettings size={24} />,
    },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar links={adminLinks} />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

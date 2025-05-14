import React from "react";
import { FaUsers, FaBriefcase, FaFileAlt, FaUserTie } from "react-icons/fa";
import InfoCard from "../../Components/InfoCard";
import AdminDashboardTable from "../../Components/AdminDashboardTable";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Hi, <span className="text-blue-600">Admin!</span>
        </h2>
        <p className="text-sm text-gray-500">Welcome back 👋</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <InfoCard title="Total Candidates" value="126" icon={FaUsers} />
        <InfoCard title="Active Jobs" value="43" icon={FaBriefcase} />
        <InfoCard title="New Applications" value="89" icon={FaFileAlt} />
        <InfoCard title="HR Members" value="15" icon={FaUserTie} />
      </div>

      {/* Recent Activity */}
      <div>
        <AdminDashboardTable />
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { FaUsers, FaBriefcase, FaFileAlt, FaUserTie } from "react-icons/fa";
import InfoCard from "../../Components/InfoCard";
import AdminDashboardTable from "../../Components/AdminDashboardTable";
import { getUserByRole } from "../../service/AuthService";
import { fetchJobs } from "../../service/Job/JobQuestionService";

const AdminDashboard = () => {
  const [candidateCount, setCandidateCount] = useState(0);
  const [hrCount, setHrCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeJobs, setActiveJobs] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get logged-in user from localStorage
        const storedData = localStorage.getItem("userData");
        const parsedUser = storedData ? JSON.parse(storedData).user : null;
        setCurrentUser(parsedUser);

        // Fetch role-based user counts
        const candidates = await getUserByRole("candidate");
        const hrMembers = await getUserByRole("hr");
        const admins = await getUserByRole("admin");
        const getActiveJobs = await fetchJobs();

        setCandidateCount(candidates?.users?.length || 0);
        setHrCount(hrMembers?.users?.length || 0);
        setAdminCount(admins?.users?.length || 0);
        setActiveJobs(getActiveJobs?.length || 0);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          {currentUser ? (
            <>
              Hi,{" "}
              <span className="text-blue-600 capitalize">
                {currentUser.role} {currentUser.full_name}!
              </span>
            </>
          ) : (
            "Hi, Admin!"
          )}
        </h2>
        <p className="text-sm text-gray-500">Welcome back 👋</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <InfoCard
          title="Total Candidates"
          value={candidateCount.toString()}
          icon={FaUsers}
        />
        <InfoCard
          title="Active Jobs"
          value={activeJobs.toString()}
          icon={FaBriefcase}
        />
        <InfoCard
          title="Total Users"
          value={(candidateCount + hrCount + adminCount).toString()}
          icon={FaFileAlt}
        />
        <InfoCard
          title="HR Members"
          value={hrCount.toString()}
          icon={FaUserTie}
        />
      </div>

      {/* Recent Activity */}
      <div>
        <AdminDashboardTable />
      </div>
    </div>
  );
};

export default AdminDashboard;

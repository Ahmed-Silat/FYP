import React, { useState, useEffect } from "react";
import CandidateResultsTable from "../../Components/CandidateResultsTable";
import { getApplicationsByUserId } from "../../service/CandidateApplicationService";

const Results = () => {
  const [applications, setApplications] = useState([]);
  
  // Get user from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.user?.id || userData?.id;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (userId) {
          const data = await getApplicationsByUserId(userId);
          setApplications(data);
        }
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    fetchApplications();
  }, [userId]);

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-blue-600">
            Your Application Activity
          </h2>
          <p className="mt-1 text-gray-500 text-sm md:text-base">
            Track your submitted responses and stay updated on your application
            status.
          </p>
        </div> 
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 overflow-x-auto">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Applications History
          </h3>
          <p className="text-sm text-gray-500">
            Track the status of all your job applications
          </p>
        </div>

        <CandidateResultsTable applications={applications} />
      </div>
    </div>
  );
};

export default Results;
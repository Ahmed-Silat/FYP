import React, { useState, useEffect } from "react";
import HrResponsesTable from "../../Components/HrResponsesTable";
import { getAllCandidateApplications } from "../../service/CandidateApplicationService";

const Responses = () => {
  const [allApplications, setAllApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hrUserId, setHrUserId] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if (userData && userData.user && userData.user.id) {
      setHrUserId(userData.user.id);
    }
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getAllCandidateApplications();
        setAllApplications(data);
        
        // Filter applications where:
        const filtered = data.filter(app => 
          app.Job?.user_id === hrUserId
        );
        
        setFilteredApplications(filtered);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError("You don't have permission to view these applications");
        } else {
          setError(err.message || "Failed to fetch applications");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [hrUserId]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600">
          Your Candidate Responses
        </h2>
        <p className="mt-1 text-gray-500 text-sm md:text-base">
          Track, review, and evaluate candidate video submissions for your posted jobs.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 w-full overflow-x-auto">
        {/* Section Header */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Your Job Applications
          </h3>
          <p className="text-sm text-gray-500">
            Review and manage candidates who applied to your job postings
          </p>
        </div>

        {/* Data Table */}
        <HrResponsesTable applications={filteredApplications} />
      </div>
    </div>
  );
};

export default Responses;
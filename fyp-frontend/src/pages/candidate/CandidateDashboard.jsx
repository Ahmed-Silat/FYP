import React from "react";
// import CandidateJobCards from "../../Components/CandidateJobCards";
import CandidateJobCards from "../../Components/CandidateJobCards";

const CandidateDashboard = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const userName = user?.user?.full_name;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Hi, <span className="text-blue-600">Candidate {userName}!</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Welcome back 👋</p>
        </div>

        <div>
          {<CandidateJobCards/>}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;

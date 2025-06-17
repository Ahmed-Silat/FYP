import React, { useEffect, useState } from "react";
// import CandidateJobCards from "../../Components/CandidateJobCards";
import CandidateJobCards from "../../Components/CandidateJobCards";
import { getUnappliedJobsByUserId } from "../../service/Job/JobQuestionService";

const CandidateDashboard = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const userName = user?.user?.full_name;

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.user?.id;
    const res = await getUnappliedJobsByUserId(userId);
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Hi, <span className="text-blue-600">Candidate {userName}!</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Welcome back 👋</p>
        </div>

        <div>{<CandidateJobCards allJobs={jobs} refreshJobs={fetchJobs} />}</div>
      </div>
    </div>
  );
};

export default CandidateDashboard;

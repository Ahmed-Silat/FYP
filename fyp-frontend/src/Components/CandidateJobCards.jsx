import React, { useState, useEffect } from "react";
import CandidateDashboardSlider from "./CandidateDashboardSlider";
import { fetchJobs } from "../service/Job/JobQuestionService";

const CandidateJobCards = () => {
  const [jobs, setJobs] = useState([]);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(jobs);
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        const jobsFromAPI = await fetchJobs();
        setJobs(jobsFromAPI || []);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setIsSliderOpen(true);
  };

  const handleCloseSlider = () => {
    setIsSliderOpen(false);
    setSelectedJob(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="flex flex-wrap p-6 gap-4">
        {jobs.length === 0 ? (
          <p className="text-gray-600 w-full">No jobs available currently.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => handleCardClick(job)}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer w-full sm:w-[48%]"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {job.job_title || "Untitled Position"}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                {job.user?.company?.company_name || "Company not specified"}
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Posted{" "}
                {job.createdAt
                  ? new Date(job.createdAt).toLocaleDateString()
                  : "Date not available"}
              </p>
              <p className="text-gray-800 mb-4">
                {job.job_description || "No description provided"}
              </p>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(job.skills) && job.skills.length > 0 ? (
                  job.skills.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-600 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">
                    No skills specified
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedJob && (
        <CandidateDashboardSlider
          isOpen={isSliderOpen}
          onClose={handleCloseSlider}
          jobDetails={selectedJob}
        />
      )}
    </div>
  );
};

export default CandidateJobCards;

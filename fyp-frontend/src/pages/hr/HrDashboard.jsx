import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import HrJobCards from "../../Components/HrJobCards";
import CreateJobModal from "../../Components/CreateJobModal";
import EditJobModal from "../../Components/EditJobModal";
import { fetchJobs, deleteJob } from "../../service/Job/JobQuestionService";

const HrDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("userData"));
  const userName = user?.user?.full_name;

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem("userData"));
        if (user?.user?.id) {
          const jobsFromAPI = await fetchJobs(user.user.id);
          setJobs(jobsFromAPI || []);
        }
      } catch (error) {
        console.error("Failed to load jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

  const handleAddJob = (newJob) => {
    setJobs((prevJobs) => [
      ...prevJobs,
      {
        ...newJob,
        skills: Array.isArray(newJob.skills)
          ? newJob.skills
          : newJob.skills
          ? [newJob.skills]
          : [],
        questions: newJob.questions || [], // Ensure questions exists
      },
    ]);
    setIsCreateModalOpen(false);
  };

  const handleEditJob = (job) => {
    setEditingJob({
      ...job,
      skills: Array.isArray(job.skills)
        ? job.skills
        : job.skills
        ? [job.skills]
        : [],
      questions: Array.isArray(job.questions)
        ? job.questions.map((q) => (typeof q === "object" ? q.question : q))
        : ["", "", ""], // Default empty questions if none exist
    });
    setIsEditModalOpen(true);
  };

  const handleSaveJob = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === updatedJob.id
          ? {
              ...updatedJob,
              skills: Array.isArray(updatedJob.skills)
                ? updatedJob.skills
                : updatedJob.skills
                ? [updatedJob.skills]
                : [],
              questions: updatedJob.questions || job.questions,
            }
          : job
      )
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return (
    <div className="px-4 md:px-8 py-6 bg-gray-50">
      <CreateJobModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleAddJob}
      />

      <EditJobModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingJob(null);
        }}
        jobData={editingJob}
        onSave={handleSaveJob}
      />

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Hi, <span className="text-blue-600">HR {userName}!</span>
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back to your dashboard 👋
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300 hover:cursor-pointer"
        >
          <IoIosAdd size={20} />
          Create Job
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading jobs...</p>
        </div>
      ) : (
        <HrJobCards
          jobs={jobs}
          onEditJob={handleEditJob}
          onDeleteJob={handleDeleteJob}
        />
      )}
    </div>
  );
};

export default HrDashboard;

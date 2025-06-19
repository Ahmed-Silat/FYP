import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import HrResponsesModal from "./hrResponsesModal";

const HrResponsesTable = ({ applications }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="overflow-x-auto mx-4 my-6">
        {applications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No applications found
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="py-3 px-6 text-left">Job Title</th>
                <th className="py-3 px-6 text-left">Candidate Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                {/* <th className="py-3 px-6 text-left">Score</th> */}
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {applications.map((application) => (
                <tr
                  key={application.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6">{application.Job.job_title}</td>
                  <td className="py-3 px-6">{application.User.full_name}</td>
                  <td className="py-3 px-6">{application.User.email}</td>
                  <td className="py-3 px-6">
                    {formatDate(application.createdAt)}
                  </td>
                  <td className="py-3 px-6">
                    <span className="capitalize">
                      {application.application_status.toLowerCase()}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => setSelectedApplication(application)}
                      className="inline-block rounded-full hover:bg-blue-100 p-2 cursor-pointer transition"
                    >
                      <MdOutlineRemoveRedEye
                        size={20}
                        className="text-gray-700"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <HrResponsesModal
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </>
  );
};

export default HrResponsesTable;

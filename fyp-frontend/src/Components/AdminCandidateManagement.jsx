import React, { useState } from "react";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import AdminCandidateModal from "./AdminCandidateModal";

const AdminCandidateManagement = () => {
  const [candidates, setCandidates] = useState([
    {
      name: "Michael Johnson",
      email: "michael.j@example.com",
      jobs: 2,
    },
    {
      name: "David Martinez",
      email: "david.m@example.com",
      jobs: 0,
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      jobs: 3,
    },
  ]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleDeleteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setDeleteModalOpen(true);
  };

  const handleViewClick = (candidate) => {
    setSelectedCandidate(candidate);
    setViewModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setCandidates(
      candidates.filter((c) => c.email !== selectedCandidate.email)
    );
    setDeleteModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-100 text-left text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Applied Jobs</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {candidates.map((candidate, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{candidate.name}</td>
                <td className="px-6 py-4">{candidate.email}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {candidate.jobs}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleViewClick(candidate)}
                      className="p-2 rounded-full hover:bg-blue-100 cursor-pointer transition"
                      title="View Details"
                    >
                      <MdOutlineRemoveRedEye className="text-blue-600 w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(candidate)}
                      className="p-2 rounded-full hover:bg-red-100 cursor-pointer transition"
                      title="Delete"
                    >
                      <MdDeleteOutline className="text-red-600 w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          message={`This will permanently remove ${selectedCandidate?.name} from the system and delete all their application data. This action cannot be undone.`}
        />
      )}

      {/* View Candidate Modal */}
      {viewModalOpen && (
        <AdminCandidateModal
          candidate={selectedCandidate}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminCandidateManagement;

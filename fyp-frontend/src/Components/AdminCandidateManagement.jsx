import React, { useState, useEffect } from "react";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import AdminCandidateModal from "./AdminCandidateModal";
import { getCandidatesWithApplicationCount } from "../service/CandidateApplicationService";
import { deleteUser } from "../service/AuthService";

const AdminCandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const data = await getCandidatesWithApplicationCount();
      setCandidates(data);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setDeleteModalOpen(true);
  };

  const handleViewClick = (candidate) => {
    setSelectedCandidate(candidate);
    setViewModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCandidate?.id) return;

    setDeleting(true);
    try {
      await deleteUser(selectedCandidate.id); // ✅ actual API call
      setCandidates((prev) =>
        prev.filter((c) => c.id !== selectedCandidate.id)
      );
    } catch (error) {
      console.error("Error deleting candidate:", error);
      alert("Failed to delete candidate.");
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
    }
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
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  Loading candidates...
                </td>
              </tr>
            ) : candidates.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No candidates found.
                </td>
              </tr>
            ) : (
              candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{candidate.name}</td>
                  <td className="px-6 py-4">{candidate.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {candidate.appliedJobsCount}
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          loading={deleting}
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

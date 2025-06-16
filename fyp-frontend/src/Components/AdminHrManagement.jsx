import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import EditHrModal from "./EditHrModal";
import DeleteModal from "./DeleteModal";
import { deleteUser, getUserByRole } from "../service/AuthService"; // ✅ adjust this path as needed
import { useSearchParams } from "react-router";

const AdminHrManagement = ({ reloadTrigger }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedHr, setSelectedHr] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const role = searchParams.get("role");

    // If 'role' is missing, set a default (e.g., 'hr')
    if (!role) {
      searchParams.set("role", "hr"); // 👈 set default role here
      setSearchParams(searchParams, { replace: true });
      return; // Exit this effect so it reruns with updated params
    }

    const fetchHRUsers = async () => {
      try {
        const hrUsers = await getUserByRole(role);
        setData(hrUsers.users);
      } catch (error) {
        console.error("Failed to fetch HR users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHRUsers();
  }, [searchParams, setSearchParams, reloadTrigger]);

  const handleEdit = (hr) => {
    setSelectedHr(hr);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (hr) => {
    setSelectedHr(hr);

    setDeleteModalOpen(true);
  };

  const handleSave = (updatedData) => {
    console.log("Updated HR data:", updatedData);
    setData(
      data.map((item) =>
        item.email === selectedHr.email ? updatedData.user : item
      )
    );
  };

  const handleDeleteConfirm = async () => {
    if (!selectedHr || !selectedHr.id) {
      console.error("No HR selected or missing ID.");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("userData"));
    if (currentUser?.email === selectedHr.email) {
      alert("You cannot delete your own account while logged in.");
      return;
    }

    try {
      await deleteUser(selectedHr.id);
      setData((prev) => prev.filter((item) => item.id !== selectedHr.id)); // Update UI
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete HR user. Please try again.");
    }
  };

  if (loading) {
    return (
      <p className="text-center py-8 text-gray-500">Loading HR users...</p>
    );
  }

  return (
    <>
      <div className="overflow-x-auto mx-4 my-6">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Company Name</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="py-3 px-6">{item.full_name}</td>
                <td className="py-3 px-6">{item.email}</td>
                <td className="py-3 px-6">{item.company.company_name}</td>
                <td className="py-3 px-6">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-full hover:bg-blue-100 transition"
                    >
                      <FaRegEdit className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item)}
                      className="p-2 rounded-full hover:bg-red-100 transition"
                    >
                      <MdDeleteOutline className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <p className="text-center text-gray-500 py-4">No HR members found.</p>
        )}
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <EditHrModal
          hrData={selectedHr}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          message={`This will permanently remove this HR member from the system. This action cannot be undone.`}
        />
      )}
    </>
  );
};

export default AdminHrManagement;

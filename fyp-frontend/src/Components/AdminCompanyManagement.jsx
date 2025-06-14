import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import EditCompanyModal from "./EditCompanyModal";
import DeleteModal from "./DeleteModal";
import {
  getAllCompanies,
  updateCompany,
  deleteCompany,
} from "../service/CompanyService";

const AdminCompanyManagement = ({ refreshKey, setRefreshKey }) => {
  const [companies, setCompanies] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanies();
        setCompanies(data.companies || []);
      } catch (err) {
        console.error("Failed to load companies", err);
        setCompanies([]); // fallback
      }
    };
    fetchCompanies();
  }, [refreshKey]);

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (company) => {
    console.log("Delete clicked for company:", company);
    setSelectedCompany(company);
    setDeleteModalOpen(true);
  };

  const handleSave = async (updatedData) => {
    try {
      await updateCompany(selectedCompany.id, updatedData.name);
      setEditModalOpen(false);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log("Deleting company:", selectedCompany);
      await deleteCompany(selectedCompany.id);
      setDeleteModalOpen(false);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto mx-4 my-6">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-6 text-left">Company Name</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {companies.map((company, index) => (
              <tr
                key={company._id || index}
                className="hover:bg-gray-50 transition"
              >
                <td className="py-3 px-6">{company.company_name}</td>
                <td className="py-3 px-6">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(company)}
                      className="p-2 rounded-full hover:bg-blue-100 transition"
                    >
                      <FaRegEdit className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(company)}
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
      </div>

      {editModalOpen && (
        <EditCompanyModal
          companyData={selectedCompany}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          message={`This will permanently remove the company from the system. This action cannot be undone.`}
        />
      )}
    </>
  );
};

export default AdminCompanyManagement;

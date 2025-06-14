import React, { useState } from "react";
import AdminCompanyManagement from "../../Components/AdminCompanyManagement";
import CreateCompanyModal from "../../Components/CreateCompanyModal";
import { FaPlus } from "react-icons/fa";
import { createCompany } from "../../service/CompanyService";

const Companies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // To trigger re-fetch

  const handleCreateCompany = async (companyName) => {
    try {
      await createCompany(companyName);
      setRefreshKey((prev) => prev + 1);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Create failed", error);
    }
  };

  return (
    <div className="p-4 w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-600">Manage Companies</h2>
          <p className="text-sm text-gray-500 mt-1">
            View, search, and add companies.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm"
        >
          <FaPlus className="text-xs" />
          Add Company
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <AdminCompanyManagement
          refreshKey={refreshKey}
          setRefreshKey={setRefreshKey}
        />
      </div>

      {isModalOpen && (
        <CreateCompanyModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateCompany}
        />
      )}
    </div>
  );
};

export default Companies;

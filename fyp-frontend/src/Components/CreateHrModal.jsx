import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { getAllCompanies } from "../service/CompanyService"; // ✅ Adjust path accordingly
import { doSignUpWithEmailAndPassword } from "../firebase/auth";
import { signup } from "../service/AuthService";

const CreateHrModal = ({ onClose, onHRCreated }) => {
  const modalRef = useRef(null);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "hr1234",
    companyId: "", // Use companyId instead of companyName
  });
  const [errors, setErrors] = useState({});
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  // Fetch companies when modal mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllCompanies();
        setCompanies(response.companies || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.companyId) newErrors.companyId = "Company is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const firebaseUser = await doSignUpWithEmailAndPassword(
        formData.email,
        formData.password
      );
      const firebaseId = firebaseUser.user.uid;

      await signup(
        firebaseId,
        formData.name,
        formData.email,
        "hr",
        formData.companyId
      );

      console.log("HR created successfully");

      onHRCreated?.(); // ✅ trigger reload in parent
      onClose(); // ✅ close the modal
    } catch (err) {
      console.error("Error creating HR:", err);
      setErrors({ email: err.message || "Failed to create HR" });
    }
  };

  const focusInput = (ref) => {
    ref.current?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-lg w-full max-w-md z-10"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center border-b border-gray-200 p-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add HR</h2>
              <p className="text-sm text-gray-500 mt-1">
                Fill in the information to create a new HR member.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <IoClose size={24} />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label
                onClick={() => focusInput(nameInputRef)}
                className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
              >
                Name
              </label>
              <input
                ref={nameInputRef}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter Full Name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                onClick={() => focusInput(emailInputRef)}
                className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
              >
                Email
              </label>
              <input
                ref={emailInputRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Company Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <select
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.companyId ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.company_name}
                  </option>
                ))}
              </select>
              {errors.companyId && (
                <p className="mt-1 text-sm text-red-600">{errors.companyId}</p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Add HR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHrModal;

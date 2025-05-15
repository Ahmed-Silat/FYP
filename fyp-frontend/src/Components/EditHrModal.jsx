import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const EditHrModal = ({ hrData, onClose, onSave }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState(hrData);
  const [errors, setErrors] = useState({});

  // Refs for input focus
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const companyInputRef = useRef(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData); // Pass updated data to parent
    onClose();
  };

  const focusInput = (ref) => ref.current?.focus();

  return (
    <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-md"
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 p-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Edit HR</h2>
              <p className="text-sm text-gray-500 mt-1">
                Update the HR member's information.
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

          {/* Body */}
          <div className="p-6 space-y-4">
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

            <div>
              <label
                onClick={() => focusInput(companyInputRef)}
                className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
              >
                Company Name
              </label>
              <input
                ref={companyInputRef}
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.company ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company}</p>
              )}
            </div>
          </div>

          {/* Footer */}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHrModal;

import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const CreateHrModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
  });
  const [errors, setErrors] = useState({});
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const companyInputRef = useRef(null);

  /// Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Close modal on outside click (FIXED)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    // Add event listener when modal mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit logic here (e.g., API call)
    console.log("Form submitted:", formData);
    onClose(); // Close modal after submission
  };

  // Focus input when label is clicked
  const focusInput = (ref) => {
    ref.current?.focus();
  };

  return (
    <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-md"
      >
        <form onSubmit={handleSubmit}>
          {/* Modal Header */}
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

          {/* Modal Body */}
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
                placeholder="John Doe"
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
                placeholder="john@example.com"
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
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Acme Inc."
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.companyName}
                </p>
              )}
            </div>
          </div>

          {/* Modal Footer */}
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

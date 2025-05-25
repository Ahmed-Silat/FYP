import React, { useEffect, useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

const EditJobModal = ({ isOpen, onClose, jobData, onSave }) => {
  // Initialize form state with jobData or defaults
  const defaultFormState = {
    jobTitle: "",
    jobDescription: "",
    questions: ["", "", ""],
    tags: [],
    tagInput: "",
  };

  const [formData, setFormData] = useState(defaultFormState);
  const [errors, setErrors] = useState({});

  // Refs for input fields
  const jobTitleRef = useRef(null);
  const jobDescriptionRef = useRef(null);
  const tagInputRef = useRef(null);
  const questionRefs = [useRef(null), useRef(null), useRef(null)];

  // Initialize form with job data when modal opens or jobData changes
  useEffect(() => {
    if (isOpen && jobData) {
      setFormData({
        jobTitle: jobData.title || "",
        jobDescription: jobData.description || "",
        questions: jobData.questions || ["", "", ""],
        tags: jobData.tags || [],
        tagInput: "",
      });
      setErrors({});
    }
  }, [isOpen, jobData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleAddTag = (e) => {
    if (e.key === "Enter" && formData.tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.tagInput.trim()],
        tagInput: "",
      });
    }
  };

  const removeTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }

    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Job description is required";
    }

    formData.questions.forEach((question, index) => {
      if (!question.trim()) {
        newErrors[`question${index}`] = `Question ${index + 1} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const updatedJob = {
        ...jobData,
        title: formData.jobTitle,
        description: formData.jobDescription,
        questions: formData.questions,
        tags: formData.tags,
      };
      onSave(updatedJob);
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen || !jobData) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-80 z-40 transition-opacity duration-300 pointer-events-auto"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
        <div
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Edit Job</h2>
                <p className="text-gray-600 mt-1">
                  Update the job details and questions below.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Job Title */}
              <div className="space-y-2">
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={() => jobTitleRef.current.focus()}
                >
                  Job Title *
                </label>
                <input
                  id="jobTitle"
                  type="text"
                  name="jobTitle"
                  ref={jobTitleRef}
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Frontend Developer"
                  className={`w-full px-4 py-2 border ${
                    errors.jobTitle ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.jobTitle && (
                  <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
                )}
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <label
                  htmlFor="jobDescription"
                  className="block text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={() => jobDescriptionRef.current.focus()}
                >
                  Job Description *
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  ref={jobDescriptionRef}
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the role and responsibilities"
                  rows={4}
                  className={`w-full px-4 py-2 border ${
                    errors.jobDescription ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.jobDescription && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.jobDescription}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={() => tagInputRef.current.focus()}
                >
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  id="tags"
                  type="text"
                  ref={tagInputRef}
                  value={formData.tagInput}
                  onChange={(e) =>
                    setFormData({ ...formData, tagInput: e.target.value })
                  }
                  onKeyDown={handleAddTag}
                  placeholder="Add tags and press Enter"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Questions */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Screening Questions *
                </h3>
                {formData.questions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <label
                      htmlFor={`question-${index}`}
                      className="block text-sm font-medium text-gray-700 cursor-pointer"
                      onClick={() => questionRefs[index].current.focus()}
                    >
                      Question {index + 1}
                    </label>
                    <input
                      id={`question-${index}`}
                      type="text"
                      ref={questionRefs[index]}
                      value={question}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                      className={`w-full px-4 py-2 border ${
                        errors[`question${index}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                      placeholder={`e.g. What is your experience with React?`}
                    />
                    {errors[`question${index}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`question${index}`]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-xl">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditJobModal;

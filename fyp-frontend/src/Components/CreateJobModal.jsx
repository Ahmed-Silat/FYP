import React, { useEffect, useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { createJobWithQuestions } from "../service/Job/JobQuestionService";

const CreateJobModal = ({ isOpen, onClose, onCreate }) => {
  const defaultFormState = {
    jobTitle: "",
    jobDescription: "",
    questions: ["", "", ""],
    tags: [],
    tagInput: "",
    errors: {},
  };

  const [formData, setFormData] = useState(defaultFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobTitleRef = useRef(null);
  const jobDescriptionRef = useRef(null);
  const tagInputRef = useRef(null);
  const questionRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (!isOpen) {
      setFormData(defaultFormState);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

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
      e.preventDefault();
      const newTag = formData.tagInput.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, newTag],
          tagInput: "",
        });
        // Clear tag error when a tag is added
        if (errors.tags) {
          const newErrors = { ...errors };
          delete newErrors.tags;
          setErrors(newErrors);
        }
      }
    }
  };

  const removeTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tags: newTags,
    });
    // Set error if no tags remain
    if (newTags.length === 0 && formData.tags.length > 0) {
      setErrors({
        ...errors,
        tags: "At least one skill is required",
      });
    }
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

    if (formData.tags.length === 0) {
      newErrors.tags = "At least one skill is required";
    }

    formData.questions.forEach((question, index) => {
      if (!question.trim()) {
        newErrors[`question${index}`] = `Question ${index + 1} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      const userId = user?.user?.id;

      if (!userId) {
        setErrors({ apiError: "User not found. Please log in again." });
        return;
      }

      const jobData = {
        job_title: formData.jobTitle,
        job_description: formData.jobDescription,
        skills: formData.tags,
        user_id: userId,
      };

      const questionsData = formData.questions
        .filter((q) => q.trim())
        .map((q) => ({ question: q }));

      const response = await createJobWithQuestions(jobData, questionsData);

      if (onCreate) {
        onCreate({
          ...response.job,
          postedOn: new Date().toLocaleDateString(),
          skills: response.job.skills,
          questions: questionsData.map((q) => q.question), // Add questions to the new job
        });
      }

      handleClose();
    } catch (error) {
      console.error("Error creating job:", error);
      setErrors({
        ...errors,
        apiError: error.message || "Failed to create job. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-80 z-40 transition-opacity duration-300 pointer-events-auto"
        onClick={handleClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
        <div
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Create Job</h2>
                <p className="text-gray-600 mt-1">
                  Fill in the job details and questions below.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
                aria-label="Close modal"
                disabled={isSubmitting}
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="p-6 space-y-6">
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
                  disabled={isSubmitting}
                />
                {errors.jobTitle && (
                  <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
                )}
              </div>

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
                  disabled={isSubmitting}
                />
                {errors.jobDescription && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.jobDescription}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={() => tagInputRef.current.focus()}
                >
                  Tags (Skills) *
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
                        disabled={isSubmitting}
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
                  placeholder="Add skills/tags and press Enter"
                  className={`w-full px-4 py-2 border ${
                    errors.tags ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                  disabled={isSubmitting}
                />
                {errors.tags && (
                  <p className="text-red-500 text-xs mt-1">{errors.tags}</p>
                )}
              </div>

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
                      disabled={isSubmitting}
                    />
                    {errors[`question${index}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`question${index}`]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {errors.apiError && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.apiError}
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-xl">
              <button
                type="submit"
                className={`w-full ${
                  isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <IoIosAdd size={20} />
                    Post Job
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateJobModal;

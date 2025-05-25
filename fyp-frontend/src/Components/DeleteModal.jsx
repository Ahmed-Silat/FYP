import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - Fixed z-index and added pointer-events-auto */}
      <div
        className="fixed inset-0 bg-black opacity-80 z-40 transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />

      {/* Modal - Higher z-index than overlay */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
        <div
          className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800">Are you sure?</h2>
          </div>

          {/* Message */}
          <div className="text-gray-600 mb-6">{message}</div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;

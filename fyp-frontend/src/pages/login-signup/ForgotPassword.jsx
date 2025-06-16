import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiCheckCircle, FiMail } from "react-icons/fi";
import { doPasswordReset } from "../../firebase/auth"; // Use the exported function

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await doPasswordReset(email);
      setSuccess("Password reset email sent. Please check your inbox.");
      setError("");
      setEmail(""); // Clear the email field
    } catch (err) {
      let errorMessage = "Failed to send reset email. Please try again.";
      if (err.code === "auth/user-not-found") {
        errorMessage = "No user found with this email address";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address";
      }
      setError(errorMessage);
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 mb-4">
            <FiMail className="h-6 w-6 text-[#101828]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
          <p className="text-gray-600">Enter your email to receive a reset link</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
            <FiAlertCircle className="mr-2" />
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center">
            <FiCheckCircle className="mr-2" />
            {success}
          </div>
        )}
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent transition"
              placeholder="you@example.com"
              required
              onChange={handleEmailChange}
              value={email}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            style={{ backgroundColor: '#101828' }}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:bg-[#0a1120]'} transition duration-200 flex justify-center items-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="text-[#101828] hover:text-[#0a1120] font-medium hover:underline transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
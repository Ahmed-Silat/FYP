import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "../../contexts/authContext";
import { doSignUpWithEmailAndPassword } from "../../firebase/auth";
import { login, signup } from "../../service/AuthService";

const Signup = () => {
  const navigate = useNavigate();
  const { userLoggedIn, setUser, setUserData } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setError("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isSigningUp) {
      setIsSigningUp(true);
      setError("");
      setSuccess("");
      
      try {
        // 1. Create Firebase auth user
        const firebaseUser = await doSignUpWithEmailAndPassword(
          email,
          password
        );
        const firebaseId = firebaseUser.user.uid;

        // 2. Create user in your database (default role: candidate)
        await signup(firebaseId, name, email, "candidate", null);

        // 3. Get complete user data
        const userData = await login(firebaseId);

        // 4. Store in localStorage and update context
        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(firebaseUser.user);
        setUserData(userData);
        
        setSuccess("Account created successfully! Redirecting...");

        // 5. Redirect to candidate dashboard
        navigate("/candidate/dashboard");
      } catch (err) {
        console.error("Signup error:", err);
        setError(err.message || "Signup failed. Please try again.");
      } finally {
        setIsSigningUp(false);
      }
    }
  };

  return (
    <>
      {/* {userLoggedIn && <Navigate to="/" replace={true} />} */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
            <p className="text-gray-600">Join us to get started</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent transition"
                placeholder="John Doe"
                required
                onChange={handleNameChange}
                value={name}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent transition"
                placeholder="john@example.com"
                required
                onChange={handleEmailChange}
                value={email}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent transition pr-10"
                  placeholder="••••••••"
                  required
                  onChange={handlePasswordChange}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-[#101828] focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent transition"
                placeholder="••••••••"
                required
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSigningUp}
              style={{ backgroundColor: '#101828' }}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white ${isSigningUp ? 'opacity-80 cursor-not-allowed' : 'hover:bg-[#0a1120]'} transition duration-200 flex justify-center items-center`}
            >
              {isSigningUp ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link 
                to="/login" 
                className="text-[#101828] hover:text-[#0a1120] font-medium hover:underline transition"
              >
                Login to your account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
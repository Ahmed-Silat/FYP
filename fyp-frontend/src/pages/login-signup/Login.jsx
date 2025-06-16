import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "../../contexts/authContext/index";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { login } from "../../service/AuthService";

const Login = () => {
  const { user, setUser, setUserData } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setError("");
      setSuccess("");
      
      try {
        const userCred = await doSignInWithEmailAndPassword(email, password);
        const firebaseId = userCred.user.uid;

        const userData = await login(firebaseId);
        localStorage.setItem("userData", JSON.stringify(userData));

        setUser(userCred.user);
        setUserData(userData);
        
        setSuccess("Successfully logged in! Redirecting...");

        if (userData.user.role === "candidate") {
          navigate("/candidate/dashboard");
        } else if (userData.user.role === "hr") {
          navigate("/hr/dashboard");
        } else if (userData.user.role === "admin") {
          navigate("/admin/dashboard");
        }
      } catch (error) {
        setError("Invalid email or password. Please try again.");
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your account</p>
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
          
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent transition"
                placeholder="you@example.com"
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
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#101828] focus:ring-[#101828] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-[#101828] hover:text-[#0a1120] hover:underline">
                Forgot password?
              </Link>
            </div>
            
            <button
              type="submit"
              disabled={isSigningIn}
              style={{ backgroundColor: '#101828' }}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white ${isSigningIn ? 'opacity-80 cursor-not-allowed' : 'hover:bg-[#0a1120]'} transition duration-200 flex justify-center items-center`}
            >
              {isSigningIn ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link 
                to="/signup" 
                className="text-[#101828] hover:text-[#0a1120] font-medium hover:underline transition"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
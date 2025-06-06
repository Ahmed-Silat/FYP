import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../contexts/authContext/index";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const userCred = await doSignInWithEmailAndPassword(email, password);
        const firebaseId = userCred.user.uid;

        const userData = await login(firebaseId); // Fetch role etc.
        localStorage.setItem("userData", JSON.stringify(userData)); // Store role

        // Redirect based on role
        if (userData.role === "candidate") {
          navigate("/candidate/dashboard");
        } else if (userData.role === "hr") {
          navigate("/hr/dashboard");
        } else if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        setError("Invalid email or password.");
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (!email || !password) {
  //       setError("Both fields are required.");
  //     } else {
  //       setError("");
  //       console.log("Login successful!");
  //       // Add your login logic here
  //     }
  //   };

  return (
    <>
      {userLoggedIn && <Navigate to="/" replace={true} />}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back 👋
          </h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
                onChange={handleEmailChange}
                value={email}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="••••••••"
                  required
                  onChange={handlePasswordChange}
                  value={password}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

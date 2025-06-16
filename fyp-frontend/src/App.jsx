import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login-signup/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Signup from "./pages/login-signup/Signup";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import Profile from "./pages/user-profile/Profile";
import CandidateLayout from "./Components/CandidateLayout";
import Results from "./pages/candidate/Results";
import HrLayout from "./Components/HrLayout";
import HrDashboard from "./pages/hr/HrDashboard";
import Responses from "./pages/hr/Responses";
import Candidates from "./pages/admin/Candidates";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HRManagement from "./pages/admin/HRManagement";
import AdminLayout from "./Components/AdminLayout";
import { useAuth } from "./contexts/authContext";
import Companies from "./pages/admin/Companies";
import ForgotPassword from "./pages/login-signup/ForgotPassword";

function App() {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#101828]"></div>
      </div>
    );
  }

  // Protected Route Wrapper
  const ProtectedRoute = ({ children, roles }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    
    if (roles && !roles.includes(userData?.user?.role)) {
      return <Navigate to="/" replace />;
    }
    
    return children ? children : <Outlet />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />       

        {/* Default Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {userData?.user?.role === "candidate" ? (
                <Navigate to="/candidate/dashboard" replace />
              ) : userData?.user?.role === "hr" ? (
                <Navigate to="/hr/dashboard" replace />
              ) : userData?.user?.role === "admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )}
            </ProtectedRoute>
          }
        />

        {/* Candidate Routes */}
        <Route
          element={
            <ProtectedRoute roles={["candidate"]}>
              <CandidateLayout />
            </ProtectedRoute>
          }
        >
          <Route path="candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="candidate/profile" element={<Profile />} />
          <Route path="candidate/results" element={<Results />} />
        </Route>

        {/* HR Routes */}
        <Route
          element={
            <ProtectedRoute roles={["hr"]}>
              <HrLayout />
            </ProtectedRoute>
          }
        >
          <Route path="hr/dashboard" element={<HrDashboard />} />
          <Route path="hr/responses" element={<Responses />} />
          <Route path="hr/profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/candidates" element={<Candidates />} />
          <Route path="admin/hr-management" element={<HRManagement />} />
          <Route path="admin/profile" element={<Profile />} />
          <Route path="admin/companies" element={<Companies />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
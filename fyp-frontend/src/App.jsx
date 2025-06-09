import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login-signup/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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

function App() {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" replace />}
        />

        {/* Default Route */}
        <Route
          path="/"
          element={
            user ? (
              userData?.user.role === "candidate" ? (
                <Navigate to="/candidate" replace />
              ) : userData?.user.role === "hr" ? (
                <Navigate to="/hr" replace />
              ) : userData?.user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Candidate Routes */}
        <Route
          path="/candidate"
          element={
            user && userData?.user.role === "candidate" ? (
              <CandidateLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CandidateDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="results" element={<Results />} />
        </Route>

        {/* HR Routes */}
        <Route
          path="/hr"
          element={
            user && userData?.user.role === "hr" ? (
              <HrLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<HrDashboard />} />
          <Route path="responses" element={<Responses />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            user && userData?.user.role === "admin" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="hr-management" element={<HRManagement />} />
          <Route path="profile" element={<Profile />} />
          <Route path="companies" element={<Companies />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

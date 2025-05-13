import { useState } from "react";
import "./App.css";
import Login from "./pages/login-signup/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Signup from "./pages/login-signup/Signup";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import Sidebar from "./Components/Sidebar";
import CandidateJobCards from "./Components/CandidateJobCards";
import SortBy from "./Components/SortBy";
import Searchbar from "./Components/Searchbar";
import CandidateResultsTable from "./Components/CandidateResultsTable";
import Profile from "./pages/user-profile/Profile";
import HrResponsesTable from "./Components/HrResponsesTable";
import AdminHrManagement from "./Components/AdminHrManagement";
import AdminCandidateManagement from "./Components/AdminCandidateManagement";
import CandidateLayout from "./Components/CandidateLayout";
import Results from "./pages/candidate/Results";
import HrJobCards from "./Components/HrJobCards";
import HrLayout from "./Components/HrLayout";
import HrDashboard from "./pages/hr/HrDashboard";
import Responses from "./pages/hr/Responses";
import Candidates from "./pages/admin/Candidates";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HRManagement from "./pages/admin/HRManagement";
function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<CandidateDashboard />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter> */}
      {/* <Sidebar /> */}
      {/* <CandidateJobCards /> */}
      {/* <SortBy /> */}
      {/* <Searchbar /> */}
      {/* <CandidateResultsTable /> */}
      {/* <Profile /> */}
      {/* <HrResponsesTable /> */}
      {/* <AdminHrManagement /> */}
      {/* <AdminCandidateManagement /> */}
      {/* <CandidateDashboard /> */}
      <Router>
        <Routes>
          <Route path="/candidate" element={<CandidateLayout />}>
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="results" element={<Results />} />
          </Route>

          <Route path="/hr" element={<HrLayout />}>
            <Route path="dashboard" element={<HrDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="responses" element={<Responses />} />
          </Route>

          <Route path="/admin" element={<HrLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="hr-management" element={<HRManagement />} />
          </Route>
        </Routes>
      </Router>

      {/* <HrJobCards /> */}
    </>
  );
}

export default App;

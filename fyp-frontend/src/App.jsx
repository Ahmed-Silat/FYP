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
      {/* <Router>
        <Routes>
          <Route path="/candidate" element={<CandidateLayout />}>
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="results" element={<Results />} />
          </Route>
        </Routes>
      </Router> */}

      <HrJobCards />
    </>
  );
}

export default App;

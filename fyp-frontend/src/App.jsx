import { useState } from "react";
import "./App.css";
import Login from "./pages/login-signup/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import Signup from "./pages/login-signup/Signup";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import Sidebar from "./Components/Sidebar";
import CandidateJobCards from "./Components/CandidateJobCards";
import SortBy from "./Components/SortBy";
import Searchbar from "./Components/Searchbar";
import CandidateResultsTable from "./Components/CandidateResultsTable";
import Profile from "./pages/user-profile/Profile";
import HrResponsesTable from "./Components/HrResponsesTable";
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
      <HrResponsesTable />
    </>
  );
}

export default App;

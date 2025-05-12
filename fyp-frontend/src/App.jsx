import { useState } from "react";
import "./App.css";
import Login from "./pages/login-signup/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import Signup from "./pages/login-signup/Signup";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<CandidateDashboard />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

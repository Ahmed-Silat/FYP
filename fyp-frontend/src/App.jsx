import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login-signup/Login";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <>
      {/* <Router>
        <Routes> */}
          {/* Public routes */}
          {/* <Route
            path="/login"
            element={
              user ? <Navigate to="/candidate/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              user ? <Navigate to="/candidate/dashboard" replace /> : <Signup />
            }
          /> */}

          {/* Default route */}
          {/* <Route
            path="/"
            element={
              user ? (
                <Navigate to="/candidate/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          /> */}

          {/* Protected candidate routes */}
          {/* <Route
            path="/candidate"
            element={
              user ? <CandidateLayout /> : <Navigate to="/login" replace />
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="results" element={<Results />} />
          </Route> */}

          {/* Catch-all route */}
          {/* <Route
            path="*"
            element={
              <Navigate to={user ? "/candidate/dashboard" : "/login"} replace />
            }
          />
        </Routes>
      </Router> */}
      {/* <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/candidate" element={<CandidateLayout />}>
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="results" element={<Results />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router> */}
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

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="hr-management" element={<HRManagement />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

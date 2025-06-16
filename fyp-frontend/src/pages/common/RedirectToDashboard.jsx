// src/pages/common/RedirectToDashboard.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const RedirectToDashboard = () => {
  const { userData } = useAuth();

  if (!userData?.user?.role) {
    return <Navigate to="/login" replace />;
  }

  switch (userData.user.role) {
    case "candidate":
      return <Navigate to="/candidate/dashboard" replace />;
    case "hr":
      return <Navigate to="/hr/dashboard" replace />;
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default RedirectToDashboard;

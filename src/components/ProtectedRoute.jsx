import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  return loggedInUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

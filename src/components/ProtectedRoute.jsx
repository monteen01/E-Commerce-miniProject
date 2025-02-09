import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  // Render Outlet for nested routes instead of children
  return <Outlet />;
};

export default ProtectedRoute;

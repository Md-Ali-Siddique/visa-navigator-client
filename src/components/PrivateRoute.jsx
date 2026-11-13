import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading fullScreen />;

  if (user) return children;

  return <Navigate to="/login" state={location.pathname} replace />;
};

export default PrivateRoute;

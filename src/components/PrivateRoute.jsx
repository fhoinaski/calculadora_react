import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../contexts/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;


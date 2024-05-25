import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserRole } from "../redux/authSlice";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUserRole);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (userRole === "admin") {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default PrivateRoute;

// routes/AdminRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserRole } from "../redux/auth/selectors";

const AdminRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUserRole);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;

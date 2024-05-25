import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import css from "./Navigation.module.css";

import { selectIsLoggedIn, selectUserRole } from "../../redux/auth/selectors";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUserRole);

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={css.link}>
        Home
      </NavLink>
      {isLoggedIn && userRole !== "admin" && (
        <NavLink to="/contacts" className={css.link}>
          Contacts
        </NavLink>
      )}
      {isLoggedIn && userRole === "admin" && (
        <NavLink to="/admin" className={css.link}>
          Admin Panel
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;

import { NavLink } from "react-router-dom";

import css from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div className={css.auth}>
      <NavLink to="/register" className={css.link}>
        Registration
      </NavLink>
      <NavLink to="/login" className={css.link}>
        Log in
      </NavLink>
    </div>
  );
};

export default AuthNav;

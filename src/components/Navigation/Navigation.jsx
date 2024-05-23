import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import css from "./Navigation.module.css";

import { selectIsLoggedIn } from "../../redux/auth/slice";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={css.link}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={css.link}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;

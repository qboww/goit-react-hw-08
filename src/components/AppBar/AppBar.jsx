import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/authSlice";

import css from "./AppBar.module.css";

import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className="container">
      <div className="card">
        <nav className={css.nav}>
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </nav>
      </div>
    </header>
  );
};

export default AppBar;

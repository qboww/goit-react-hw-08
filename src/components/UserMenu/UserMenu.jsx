import { useDispatch, useSelector } from "react-redux";

import css from "./UseMenu.module.css";

import { selectUserName } from "../../redux/auth/slice.js";
import { logoutThunk } from "../../redux/auth/operations";

const UserMenu = () => {
  const username = useSelector(selectUserName);

  const dispatch = useDispatch();

  return (
    <div className={css.wrapper}>
      <p className={css.title}>Welcome, {username}</p>
      <a onClick={() => dispatch(logoutThunk())} className={css.logout}>
        Logout
      </a>
    </div>
  );
};

export default UserMenu;

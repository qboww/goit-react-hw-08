import { useDispatch, useSelector } from "react-redux";

import css from "./UseMenu.module.css";

import { selectUserName } from "../../redux/authSlice";
import { logoutThunk } from "../../redux/authOperations";

const UserMenu = () => {
  const username = useSelector(selectUserName);

  const dispatch = useDispatch();

  return (
    <div className={css.wrapper}>
      <p className={css.title}>Logged as, {username}</p>
      <a onClick={() => dispatch(logoutThunk())} className={css.logout}>
        Logout
      </a>
    </div>
  );
};

export default UserMenu;

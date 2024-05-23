import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

import css from "./Contact.module.css";

import { useDispatch } from "react-redux";
import { deleteContactsThunk } from "../../redux/contacts/operations";

export const Contact = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className={css.contactContainer}>
      <div className={css.contactItem}>
        <p>
          <FaUser className={css.contactIcon} />
          {item.name}
        </p>
        <p>
          <FaPhoneAlt className={css.contactIcon} />
          {item.number}
        </p>
      </div>
      <button onClick={() => dispatch(deleteContactsThunk(item.id))}>
        Delete
      </button>
    </div>
  );
};

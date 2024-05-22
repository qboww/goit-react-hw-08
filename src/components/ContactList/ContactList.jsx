import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

import {
  selectFilteredContacts,
  selectIsLoading,
} from "../../redux/contactsSlice";

import css from "./ContactList.module.css";

export const ContactList = () => {
  const isLoading = useSelector(selectIsLoading);
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <div className="sub-card">
      <div className={css.listParams}>
        <h2>Check contacts list</h2>
        <p>Length: {filteredContacts.length}</p>
      </div>

      {isLoading && <Loader />}

      <ul className={css.contactsList}>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;

import { useSelector } from "react-redux";

import css from "./ContactList.module.css";

import { Contact } from "../Contact/Contact";

import { selectFilteredContacts } from "../../redux/contacts/selectors";

const ContactList = () => {
  const filteredItems = useSelector(selectFilteredContacts);

  return (
    <div className="sub-card">
      <div className={css.listParams}>
        <h2 className={css.checkContact}>Check contacts list</h2>
        <p>Length: {filteredItems.length}</p>
      </div>

      <ul className={css.contact_list}>
        {filteredItems.length ? (
          filteredItems.map((item) => <Contact item={item} key={item.id} />)
        ) : (
          <p>No contacts found</p>
        )}
      </ul>
    </div>
  );
};

export default ContactList;

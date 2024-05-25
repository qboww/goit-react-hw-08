import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import { fetchContactsThunk } from "../../redux/contactsOperations";
import {
  addContact,
  updateContact,
  deleteContact,
} from "../../redux/contactsSlice";

const ContactsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());

    const eventSource = new EventSource("http://localhost:5000/events");

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      switch (parsedData.type) {
        case "ADD_CONTACT":
          dispatch(addContact(parsedData.payload));
          break;
        case "UPDATE_CONTACT":
          dispatch(updateContact(parsedData.payload));
          break;
        case "DELETE_CONTACT":
          dispatch(deleteContact(parsedData.payload));
          break;
        default:
          break;
      }
    };

    const pollInterval = setInterval(() => {
      dispatch(fetchContactsThunk());
    }, 5000); // Poll every 5 seconds

    return () => {
      eventSource.close();
      clearInterval(pollInterval);
    };
  }, [dispatch]);

  return (
    <div className="container">
      <div className="card">
        <h1>Phonebook</h1>
        <ContactForm />
        <SearchBox />
        <ContactList />
      </div>
    </div>
  );
};

export default ContactsPage;

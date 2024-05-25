import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllContactsThunk,
  deleteContactAdminThunk,
  editContactAdminThunk,
} from "../../redux/contactsOperations";
import {
  addContact,
  updateContact,
  deleteContact,
  selectContacts,
} from "../../redux/contactsSlice";
import AdminTable from "../../components/AdminTable/AdminTable";
import css from "./AdminPage.module.css";

const AdminPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchAllContactsThunk());

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
      dispatch(fetchAllContactsThunk());
    }, 5000); // Poll every 5 seconds

    return () => {
      eventSource.close();
      clearInterval(pollInterval);
    };
  }, [dispatch]);

  const handleSave = (id, name, number) => {
    dispatch(editContactAdminThunk({ id, name, number }));
  };

  const handleDelete = (id) => {
    dispatch(deleteContactAdminThunk(id));
  };

  return (
    <div className="container">
      <div className={css.wrapper}>
        <div className={css.subCard}>
          <div className={css.wrapperText}>
            <h1>Admin Page</h1>
            <p>Here you are able to edit and delete contacts</p>
          </div>
        </div>
        <div className={css.subCard}>
          <AdminTable
            contacts={contacts}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

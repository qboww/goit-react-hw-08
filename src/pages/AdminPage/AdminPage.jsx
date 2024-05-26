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
  selectFilteredContacts,
} from "../../redux/contactsSlice";
import AdminTable from "../../components/AdminTable/AdminTable";
import SearchBox from "../../components/SearchBox/SearchBox";

const AdminPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

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
    }, 5000);

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
      <div className="wrapper">
        <div className="card">
          <div className="card-desc">
            <h1>Admin Page</h1>
            <p>Here you are able to edit and delete contacts</p>
          </div>
        </div>
        <div className="card">
          <SearchBox />
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

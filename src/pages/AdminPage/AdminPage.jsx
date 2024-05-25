import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllContactsThunk,
  deleteContactAdminThunk,
  editContactAdminThunk,
} from "../../redux/contacts/operations";
import { selectContacts } from "../../redux/contacts/slice";
import css from "./AdminPage.module.css";

const AdminPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [editingContactId, setEditingContactId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editNumber, setEditNumber] = useState("");

  useEffect(() => {
    dispatch(fetchAllContactsThunk());
  }, [dispatch]);

  const handleEdit = (contact) => {
    setEditingContactId(contact._id);
    setEditName(contact.name);
    setEditNumber(contact.number);
  };

  const handleSave = (id) => {
    dispatch(editContactAdminThunk({ id, name: editName, number: editNumber }));
    setEditingContactId(null);
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
            <p>Here you are able to edit and delte contacts</p>
          </div>
        </div>

        <div className={css.subCard}>
          <div className={css.subContainer}>
            <table className={css.customTable}>
              <thead className={css.customHead}>
                <tr className={css.customRow}>
                  <th className={css.customH}>Name</th>
                  <th className={css.customH}>Number</th>
                  <th className={css.customH}>Actions</th>
                </tr>
              </thead>
              <tbody className={css.customBody}>
                {contacts.map((contact) => (
                  <tr key={contact._id} className={css.customRow}>
                    <td className={css.customCell}>
                      {editingContactId === contact._id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      ) : (
                        contact.name
                      )}
                    </td>
                    <td className={css.customCell}>
                      {editingContactId === contact._id ? (
                        <input
                          type="text"
                          value={editNumber}
                          onChange={(e) => setEditNumber(e.target.value)}
                        />
                      ) : (
                        contact.number
                      )}
                    </td>
                    <td className={`${css.customCell} ${css.customActions}`}>
                      <div className={css.customButtons}>
                        {editingContactId === contact._id ? (
                          <button onClick={() => handleSave(contact._id)}>
                            Save
                          </button>
                        ) : (
                          <button onClick={() => handleEdit(contact)}>
                            Edit
                          </button>
                        )}

                        <button onClick={() => handleDelete(contact._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

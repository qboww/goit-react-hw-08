import { useState } from "react";
import css from "./AdminTable.module.css";

const AdminTable = ({ contacts, onSave, onDelete }) => {
  const [editingContactId, setEditingContactId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editNumber, setEditNumber] = useState("");

  const handleEdit = (contact) => {
    setEditingContactId(contact._id);
    setEditName(contact.name);
    setEditNumber(contact.number);
  };

  const handleSave = (id) => {
    onSave(id, editName, editNumber);
    setEditingContactId(null);
  };

  return (
    <div className="sub-card">
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
                    <button onClick={() => handleEdit(contact)}>Edit</button>
                  )}
                  <button onClick={() => onDelete(contact._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;

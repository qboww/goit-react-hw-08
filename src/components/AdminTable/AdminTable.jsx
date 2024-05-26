import { useState } from "react";
import css from "./AdminTable.module.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const AdminTable = ({ tasks, onSave, onDelete }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTask, setEditTask] = useState({
    courseName: "",
    taskName: "",
    taskDescription: "",
    deadlineDate: "",
    mark: "",
    state: "pending",
  });

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditTask({
      courseName: task.courseName,
      taskName: task.taskName,
      taskDescription: task.taskDescription,
      deadlineDate: formatDate(task.deadlineDate),
      mark: task.mark,
      state: task.state,
    });
  };

  const handleSave = (id) => {
    onSave(id, editTask);
    setEditingTaskId(null);
  };

  return (
    <div className="sub-card">
      <h2 className="component-title">Manage tasks</h2>
      <table className={css.customTable}>
        <thead className={css.customHead}>
          <tr className={css.customRow}>
            <th className={css.customH}>Task Name</th>
            <th className={css.customH}>Deadline</th>
            <th className={css.customH}>Mark</th>
            <th className={css.customH}>Actions</th>
          </tr>
        </thead>
        <tbody className={css.customBody}>
          {tasks.map((task) => (
            <tr key={task._id} className={css.customRow}>
              <td className={css.customCell}>
                {editingTaskId === task._id ? (
                  <input
                    type="text"
                    value={editTask.taskName}
                    onChange={(e) =>
                      setEditTask({ ...editTask, taskName: e.target.value })
                    }
                  />
                ) : (
                  task.taskName
                )}
              </td>
              <td className={css.customCell}>
                {editingTaskId === task._id ? (
                  <input
                    type="date"
                    value={editTask.deadlineDate}
                    onChange={(e) =>
                      setEditTask({ ...editTask, deadlineDate: e.target.value })
                    }
                  />
                ) : (
                  new Date(task.deadlineDate).toLocaleDateString()
                )}
              </td>
              <td className={css.customCell}>
                {editingTaskId === task._id ? (
                  <input
                    type="number"
                    value={editTask.mark}
                    onChange={(e) =>
                      setEditTask({ ...editTask, mark: e.target.value })
                    }
                  />
                ) : (
                  task.mark
                )}
              </td>
              <td className={`${css.customCell} ${css.customActions}`}>
                <div className={css.customButtons}>
                  {editingTaskId === task._id ? (
                    <button
                      aria-label="Save"
                      onClick={() => handleSave(task._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button aria-label="Edit" onClick={() => handleEdit(task)}>
                      Edit
                    </button>
                  )}
                  <button
                    aria-label="Delete"
                    onClick={() => onDelete(task._id)}
                  >
                    Delete
                  </button>
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

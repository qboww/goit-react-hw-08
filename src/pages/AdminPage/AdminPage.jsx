import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTasksThunk,
  deleteTaskAdminThunk,
  editTaskAdminThunk,
} from "../../redux/tasksOperations";
import {
  addTask,
  updateTask,
  deleteTask,
  selectTasks,
} from "../../redux/tasksSlice";
import AdminTable from "../../components/AdminTable/AdminTable";
import css from "./AdminPage.module.css";

const AdminPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchAllTasksThunk());

    const eventSource = new EventSource("http://localhost:5000/events");

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      switch (parsedData.type) {
        case "ADD_TASK":
          dispatch(addTask(parsedData.payload));
          break;
        case "UPDATE_TASK":
          dispatch(updateTask(parsedData.payload));
          break;
        case "DELETE_TASK":
          dispatch(deleteTask(parsedData.payload));
          break;
        default:
          break;
      }
    };

    const pollInterval = setInterval(() => {
      dispatch(fetchAllTasksThunk());
    }, 5000); // Poll every 5 seconds

    return () => {
      eventSource.close();
      clearInterval(pollInterval);
    };
  }, [dispatch]);

  const handleSave = (id, updatedTask) => {
    dispatch(editTaskAdminThunk({ id, ...updatedTask }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTaskAdminThunk(id));
  };

  return (
    <div className="container">
      <div className={css.wrapper}>
        <div className={css.subCard}>
          <div className={css.wrapperText}>
            <h1>Admin Page</h1>
            <p>Here you are able to edit and delete tasks</p>
          </div>
        </div>
        <div className={css.subCard}>
          <AdminTable
            tasks={tasks}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

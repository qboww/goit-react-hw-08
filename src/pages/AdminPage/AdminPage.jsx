import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllTasksThunk } from "../../redux/tasksOperations";
import { addTask, updateTask, deleteTask } from "../../redux/tasksSlice";
import AdminForm from "../../components/AdminForm/AdminForm";
import AdminSearch from "../../components/AdminSearch/AdminSearch";
import TaskForm from "../../components/TaskForm/TaskForm";
import { Toaster } from "react-hot-toast";

const AdminPage = () => {
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);

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
    }, 5000);

    return () => {
      eventSource.close();
      clearInterval(pollInterval);
    };
  }, [dispatch]);

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const handleTaskDeleted = () => {
    setSelectedTask(null);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="card">
          <div className="card-desc">
            <h1>Admin Page</h1>
            <p>Here you are able to create, edit, and delete tasks</p>
          </div>
        </div>
        <div className="card">
          <TaskForm />
          <AdminSearch onSelectTask={handleSelectTask} />
          <AdminForm selectedTask={selectedTask} onDelete={handleTaskDeleted} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminPage;

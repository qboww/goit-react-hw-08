// TasksPage.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TaskList from "../../components/TaskList/TaskList";
import SearchBox from "../../components/SearchBox/SearchBox";
import { fetchTasksThunk } from "../../redux/tasksOperations";
import { addTask, updateTask, deleteTask } from "../../redux/tasksSlice";

const TasksPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksThunk());

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
      dispatch(fetchTasksThunk());
    }, 5000); // Poll every 5 seconds

    return () => {
      eventSource.close();
      clearInterval(pollInterval);
    };
  }, [dispatch]);

  return (
    <div className="container">
      <div className="card">
        <h1>Task Tracker</h1>
        <SearchBox />
        <TaskList />
      </div>
    </div>
  );
};

export default TasksPage;

// Task.js
import { FaTasks } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import css from "./Task.module.css";
import { useDispatch } from "react-redux";
import { deleteTaskThunk } from "../../redux/tasksOperations";

export const Task = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className={css.taskContainer}>
      <div className={css.taskItem}>
        <p>
          <FaTasks className={css.taskIcon} />
          {item.taskName}
        </p>
        <p>
          <FaCalendarAlt className={css.taskIcon} />
          {new Date(item.deadlineDate).toLocaleDateString()}
        </p>
        <p>Course: {item.courseName}</p>
        <p>Description: {item.taskDescription}</p>
        <p>Mark: {item.mark}</p>
        <p>Status: {item.state}</p>
      </div>
      <button onClick={() => dispatch(deleteTaskThunk(item._id))}>
        Delete
      </button>
    </div>
  );
};

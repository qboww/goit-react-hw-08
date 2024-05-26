// Task.js
import { FaCalendarAlt } from "react-icons/fa";
import css from "./Task.module.css";

export const Task = ({ item }) => {
  return (
    <div>
      <div className={css.taskContainer}>
        <div className={css.taskItem}>
          <div className={css.nameDate}>
            <h2 className={css.taskName}>{item.taskName}</h2>
            <p>
              <FaCalendarAlt className={css.taskIcon} />
              {new Date(item.deadlineDate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className={css.taskDescription}>{item.taskDescription}</p>
          </div>

          <div className={css.badges}>
            <p className={css.course}>Course: {item.courseName}</p>
            <p className={css.mark}>Mark: {item.mark}</p>
            <p className={css.pending}>Status: {item.state}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

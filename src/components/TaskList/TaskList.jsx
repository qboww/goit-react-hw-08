import { useSelector } from "react-redux";
import css from "./TaskList.module.css";
import { Task } from "../Task/Task";
import { selectFilteredTasks } from "../../redux/tasksSlice";

const TaskList = () => {
  const filteredItems = useSelector(selectFilteredTasks);

  return (
    <div className="sub-card">
      <div className={css.listParams}>
        <h2 className={css.checkTask}>Check tasks list</h2>
        <p>Length: {filteredItems.length}</p>
      </div>

      <ul className={css.tasksList}>
        {filteredItems.length ? (
          filteredItems.map((item) => <Task item={item} key={item._id} />)
        ) : (
          <p>No tasks found</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;

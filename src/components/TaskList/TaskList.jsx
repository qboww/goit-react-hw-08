// TaskList.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "./TaskList.module.css";
import { Task } from "../Task/Task";
import { selectFilteredTasks } from "../../redux/tasksSlice";
import Pagination from "../Pagination/Pagination";
import { fetchTasksWithPaginationThunk } from "../../redux/tasksOperations";

const TaskList = () => {
  const dispatch = useDispatch();
  const filteredItems = useSelector(selectFilteredTasks);
  const totalPages = useSelector((state) => state.tasks.totalPages);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTasksWithPaginationThunk(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

      {filteredItems.length >= 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TaskList;

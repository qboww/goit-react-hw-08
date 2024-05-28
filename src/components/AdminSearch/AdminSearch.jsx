// AdminSearch.js
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasksThunk } from "../../redux/tasksOperations";
import { selectAllTasks, selectIsLoading } from "../../redux/tasksSlice";
import css from "./AdminSearch.module.css";

const AdminSearch = ({ onSelectTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const isLoading = useSelector(selectIsLoading);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    dispatch(fetchAllTasksThunk());
  }, [dispatch]);

  useEffect(() => {
    setOptions(
      tasks.map((task) => ({
        value: task._id,
        label: task.taskName,
      })),
    );
  }, [tasks]);

  const handleSelectChange = (selectedOption) => {
    const selectedTask = tasks.find(
      (task) => task._id === selectedOption.value,
    );
    onSelectTask(selectedTask);
  };

  return (
    <div className="sub-card">
      <h2 className="component-title">Admin Search</h2>
      <p>Provide task name</p>
      <Select
        isLoading={isLoading}
        options={options}
        onChange={handleSelectChange}
        placeholder="Search tasks..."
      />
    </div>
  );
};

export default AdminSearch;

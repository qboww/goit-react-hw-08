// SearchBox.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchTasksThunk } from "../../redux/tasksOperations";
import { selectMatchedTask } from "../../redux/tasksSlice";
import { Task } from "../Task/Task";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const matchedTask = useSelector(selectMatchedTask);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() !== "") {
      dispatch(searchTasksThunk(value));
    }
  };

  return (
    <div className="sub-card">
      <h2 className="component-title">Search for tasks</h2>
      <label>Find tasks by name</label>
      <input
        type="text"
        name="filter"
        placeholder="Enter search prompt..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {searchQuery.trim() &&
        (matchedTask ? (
          <div className={css.matchedTask}>
            <Task item={matchedTask} />
          </div>
        ) : (
          <p style={{ paddingTop: 16 }}>No matching task found</p>
        ))}
    </div>
  );
};

export default SearchBox;

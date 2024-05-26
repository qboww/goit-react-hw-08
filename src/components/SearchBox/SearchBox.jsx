import { useDispatch } from "react-redux";
import css from "./SearchBox.module.css";
import { useId } from "react";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterFieldId = useId();

  return (
    <div className="sub-card">
      <div className={css.searchContainer}>
        <h2>Search for tasks</h2>
        <label htmlFor={filterFieldId}>Find tasks by name or description</label>
        <input
          type="text"
          name="filter"
          id={filterFieldId}
          placeholder="Enter search prompt..."
          onChange={(e) => {
            dispatch(changeFilter(e.target.value));
          }}
        />
      </div>
    </div>
  );
};

export default SearchBox;

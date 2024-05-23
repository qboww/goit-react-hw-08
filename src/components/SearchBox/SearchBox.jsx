import { useDispatch } from "react-redux";

import css from "./SearchBox.module.css";

import { useId } from "react";
import { changeFilter } from "../../redux/filters/slice";

const SearchBox = () => {
  const dispatch = useDispatch();

  const filterFieldId = useId();

  return (
    <div className="sub-card">
      <div className={css.searchContainer}>
        <h2>Search for someone</h2>
        <label htmlFor={filterFieldId}>Find contacts by name</label>
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

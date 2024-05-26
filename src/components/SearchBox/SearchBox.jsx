import { useDispatch } from "react-redux";
import { useId } from "react";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterFieldId = useId();

  return (
    <div className="sub-card">
      <h2 className="component-title">Search for tasks</h2>
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
  );
};

export default SearchBox;

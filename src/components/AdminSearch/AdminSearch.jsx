import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCakesThunk } from "../../redux/cakesOperations";
import { selectAllCakes, selectIsLoadingCakes } from "../../redux/cakesSlice";
import css from "./AdminSearch.module.css";

const AdminSearch = ({ onSelectCake }) => {
  const dispatch = useDispatch();
  const allCakes = useSelector(selectAllCakes);
  const isLoading = useSelector(selectIsLoadingCakes);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCakesThunk());
  }, [dispatch]);

  const cakes = useMemo(
    () => (Array.isArray(allCakes) ? allCakes : []),
    [allCakes],
  );

  useEffect(() => {
    if (cakes.length > 0) {
      const options = cakes.map((cake) => ({
        value: cake._id,
        label: cake.name,
      }));
      setOptions(options);
    }
  }, [cakes, onSelectCake]);

  const handleSelectChange = (selectedOption) => {
    const selectedCake = cakes.find(
      (cake) => cake._id === selectedOption.value,
    );
    setSelectedOption(selectedOption);
    onSelectCake(selectedCake);
  };

  return (
    <div className="sub-card">
      <h2 className="component-title">Find a cake to edit</h2>
      <p style={{color: "black"}}>Provide cake name</p>
      <Select
        isLoading={isLoading}
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
        placeholder="Search cakes..."
      />
    </div>
  );
};

export default AdminSearch;

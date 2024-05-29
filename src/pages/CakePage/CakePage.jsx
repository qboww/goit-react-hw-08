import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import CakeList from "../../components/CakeList/CakeList";
import Pagination from "../../components/Pagination/Pagination";
import {
  fetchCakesThunk,
  fetchIngredientsThunk,
} from "../../redux/cakesOperations";
import { selectTotalPages, selectIngredients } from "../../redux/cakesSlice";
import css from "./CakePage.module.css";

const CakesPage = () => {
  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPages);
  const ingredientOptions = useSelector(selectIngredients);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    dispatch(
      fetchCakesThunk({
        page: currentPage,
        sortBy,
        order,
        search,
        ingredients: selectedIngredients.map((ingredient) => ingredient.value),
      }),
    );
  }, [dispatch, currentPage, sortBy, order, search, selectedIngredients]);

  useEffect(() => {
    dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (wrapperRef.current) {
      wrapperRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleIngredientChange = (selectedOptions) => {
    setSelectedIngredients(selectedOptions || []);
  };

  const handleOrder = (cake) => {
    console.log("Order cake", cake);
  };

  return (
    <div className="container" ref={wrapperRef}>
      <div className="wrapper">
        <div className="card">
          <div className={css.controlsContainer}>
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={handleSearchChange}
            />
            <select value={sortBy} onChange={handleSortChange}>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="weight">Weight</option>
            </select>
            <select value={order} onChange={handleOrderChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <Select
              isMulti
              value={selectedIngredients}
              onChange={handleIngredientChange}
              options={ingredientOptions}
              placeholder="Select ingredients"
            />
          </div>
        </div>
        <div className="card">
          <CakeList onOrder={handleOrder} />
        </div>
        <div className="card">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CakesPage;

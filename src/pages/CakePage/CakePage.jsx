import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import CakeList from "../../components/CakeList/CakeList";
import Pagination from "../../components/Pagination/Pagination";
import OrderModal from "../../components/OrderModal/OrderModal";
import Loader from "../../components/Loader/Loader";
import {
  fetchCakesThunk,
  fetchIngredientsThunk,
} from "../../redux/cakesOperations";
import {
  selectTotalPages,
  selectIngredients,
  selectIsLoadingCakes,
} from "../../redux/cakesSlice";
import css from "./CakePage.module.css";
import WeatherWidget from "../../components/WeatherWidget/WeatherWidget";

const CakesPage = () => {
  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPages);
  const ingredientOptions = useSelector(selectIngredients);
  const isLoading = useSelector(selectIsLoadingCakes);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setSelectedCake(cake);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCake(null);
  };

  const handleOrderSubmit = (data) => {
    console.log("Order submitted:", data);
    setIsModalOpen(false);
    setSelectedCake(null);
    toast.success("Order has been processed successfully!");
  };

  return (
    <div>
      <div className="container" ref={wrapperRef}>
        <div className="card">
          <Toaster />
          <div className="wrapper">
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
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <CakeList onOrder={handleOrder} />
                <div className={css.paginationContainer}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
          {selectedCake && (
            <OrderModal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              cake={selectedCake}
              onSubmit={handleOrderSubmit}
            />
          )}
        </div>
      </div>
      <WeatherWidget />
    </div>
  );
};

export default CakesPage;

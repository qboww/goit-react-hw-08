import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "./CakeList.module.css";
import CakeCard from "../CakeCard/CakeCard";
import Pagination from "../Pagination/Pagination";
import {
  selectCakes,
  selectIsLoadingCakes,
  selectIsErrorCakes,
  selectTotalPages,
} from "../../redux/cakesSlice";
import { fetchCakesThunk } from "../../redux/cakesOperations";

const CakeList = () => {
  const dispatch = useDispatch();
  const cakes = useSelector(selectCakes);
  const isLoading = useSelector(selectIsLoadingCakes);
  const isError = useSelector(selectIsErrorCakes);
  const totalPages = useSelector(selectTotalPages);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCakesThunk({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOrder = (cake) => {
    console.log("Order cake", cake);
  };

  return (
    <div>

      <ul className={css.cakeList}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading cakes!</p>}
        {cakes.length ? (
          cakes.map((cake) => (
            <CakeCard cake={cake} onOrder={handleOrder} key={cake._id} />
          ))
        ) : (
          <p>No cakes found</p>
        )}
      </ul>

      {cakes.length >= 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default CakeList;

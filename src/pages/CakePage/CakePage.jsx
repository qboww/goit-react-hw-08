import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import CakeList from "../../components/CakeList/CakeList";
import { fetchCakesThunk } from "../../redux/cakesOperations";

const CakesPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const wrapperRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCakesThunk({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (wrapperRef.current) {
      // Smooth scroll to wrapperRef on page change
      wrapperRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container" ref={wrapperRef}>
      <div className="wrapper">
        <div className="card">
          <div className="card-desc">
            <h1>Bakery!</h1>
            <p>Lets bake a cake you wanted!</p>
          </div>
        </div>
        <div className="card">
          <CakeList currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default CakesPage;

import React from "react";
import { useSelector } from "react-redux";
import css from "./CakeList.module.css";
import CakeCard from "../CakeCard/CakeCard";
import Loader from "../Loader/Loader";
import {
  selectCakes,
  selectIsLoadingCakes,
  selectIsErrorCakes,
} from "../../redux/cakesSlice";

const CakeList = ({ onOrder }) => {
  const cakes = useSelector(selectCakes);
  const isLoading = useSelector(selectIsLoadingCakes);
  const isError = useSelector(selectIsErrorCakes);

  return (
    <div>
      {isLoading && <Loader />}
      <ul className={css.cakeList}>
        {isError && <p>Error loading cakes!</p>}
        {!isLoading && cakes.length
          ? cakes.map((cake) => (
              <CakeCard cake={cake} onOrder={onOrder} key={cake._id} />
            ))
          : !isLoading && <p>No cakes found</p>}
      </ul>
    </div>
  );
};

export default CakeList;

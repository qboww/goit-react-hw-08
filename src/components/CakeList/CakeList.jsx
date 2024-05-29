import React from "react";
import { useSelector } from "react-redux";
import css from "./CakeList.module.css";
import CakeCard from "../CakeCard/CakeCard";
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
      <ul className={css.cakeList}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading cakes!</p>}
        {cakes.length ? (
          cakes.map((cake) => (
            <CakeCard cake={cake} onOrder={onOrder} key={cake._id} />
          ))
        ) : (
          <p>No cakes found</p>
        )}
      </ul>
    </div>
  );
};

export default CakeList;

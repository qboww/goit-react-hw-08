import React from "react";
import PropTypes from "prop-types";
import css from "./CakeCard.module.css";

const CakeCard = ({ cake, onOrder }) => {
  return (
    <div className={css.cakeCard}>
      <div className={css.cardDetails}>
        <img src="../../../cheese-cake.png" alt={cake.name} />
        <div className={css.data}>
          <h2 className={css.cakeName}>{cake.name}</h2>
          <p>{cake.components.join(", ")}</p>
          <p>Weight: {cake.weight} kg</p>
          <p>
            Price: <span className={css.price}>${cake.price}</span>
          </p>
        </div>
      </div>
      <button onClick={() => onOrder(cake)}>Order</button>
    </div>
  );
};

CakeCard.propTypes = {
  cake: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    components: PropTypes.arrayOf(PropTypes.string).isRequired,
    weight: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onOrder: PropTypes.func.isRequired,
};

export default CakeCard;

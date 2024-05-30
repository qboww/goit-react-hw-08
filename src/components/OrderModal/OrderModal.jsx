import React from "react";
import PropTypes from "prop-types";
import css from "./OrderModal.module.css";

const OrderModal = ({ isOpen, onClose, cake, onSubmit }) => {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      address: formData.get("address"),
      date: formData.get("date"),
      time: formData.get("time"),
    };
    onSubmit(data);
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <h2>Order {cake.name}</h2>
        <p>{cake.components.join(", ")}</p>
        <p>Weight: {cake.weight} kg</p>
        <p>Price: ${cake.price}</p>
        <form onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="address">Address:</label>
            <input type="text" name="address" id="address" required />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="date">Date:</label>
            <input type="date" name="date" id="date" required />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="time">Time:</label>
            <input type="time" name="time" id="time" required />
          </div>
          <button type="submit">Submit Order</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

OrderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cake: PropTypes.shape({
    name: PropTypes.string.isRequired,
    components: PropTypes.arrayOf(PropTypes.string).isRequired,
    weight: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default OrderModal;

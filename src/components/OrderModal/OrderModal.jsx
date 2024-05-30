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
    onClose(); // Close the modal
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <h2 className={css.orderName}>Order: {cake.name}</h2>
        <div className={css.dataText}>
          <p style={{ color: "black" }}>{cake.components.join(", ")}</p>
          <p style={{ color: "black" }}>Weight: {cake.weight} kg</p>
          <p style={{ color: "black" }}>Price: ${cake.price}</p>
        </div>
        <div className={css.formWrapper}>
          <form onSubmit={handleSubmit}>
            <div className={css.formGroup}>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                id="address"
                required
                placeholder="Provide your address..."
              />
            </div>
            <div className={css.formGroup}>
              <label htmlFor="date">Date:</label>
              <input
                style={{ colorScheme: "dark" }}
                type="date"
                name="date"
                id="date"
                required
              />
            </div>
            <div className={css.formGroup}>
              <label htmlFor="time">Time:</label>
              <input
                style={{ colorScheme: "dark" }}
                type="time"
                name="time"
                id="time"
                required
              />
            </div>
            <div className={css.buttons}>
              <button className={css.submit} type="submit">
                Submit Order
              </button>
              <button className={css.close} type="button" onClick={onClose}>
                Close
              </button>
            </div>
          </form>
        </div>
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

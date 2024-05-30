import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCakesThunk } from "../../redux/cakesOperations";
import { addCake, updateCake, deleteCake } from "../../redux/cakesSlice";
import AdminForm from "../../components/AdminForm/AdminForm";
import AdminSearch from "../../components/AdminSearch/AdminSearch";
import CakeForm from "../../components/CakeForm/CakeForm";
import { Toaster } from "react-hot-toast";
import css from "./AdminPage.module.css";

const AdminPage = () => {
  const dispatch = useDispatch();
  const [selectedCake, setSelectedCake] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCakesThunk());

    const eventSource = new EventSource("http://localhost:5000/events");

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      switch (parsedData.type) {
        case "ADD_CAKE":
          dispatch(addCake(parsedData.payload));
          break;
        case "UPDATE_CAKE":
          dispatch(updateCake(parsedData.payload));
          break;
        case "DELETE_CAKE":
          dispatch(deleteCake(parsedData.payload));
          break;
        default:
          break;
      }
    };

    const pollInterval = setInterval(() => {
      dispatch(fetchAllCakesThunk());
    }, 5000);

    return () => {
      eventSource.close();
      clearInterval(pollInterval);
    };
  }, [dispatch]);

  const handleSelectCake = (cake) => {
    setSelectedCake(cake);
  };

  const handleCakeDeleted = () => {
    setSelectedCake(null);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <AdminSearch onSelectCake={handleSelectCake} />
        <div className={css.sides}>
          <div className={css.side}>
            <CakeForm />
          </div>
          <div className={css.side}>
            <AdminForm
              selectedCake={selectedCake}
              onDelete={handleCakeDeleted}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminPage;

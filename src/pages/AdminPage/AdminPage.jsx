import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCakesThunk } from "../../redux/cakesOperations";
import { addCake, updateCake, deleteCake } from "../../redux/cakesSlice";
import AdminForm from "../../components/AdminForm/AdminForm";
import AdminSearch from "../../components/AdminSearch/AdminSearch";
import CakeForm from "../../components/CakeForm/CakeForm";
import { Toaster } from "react-hot-toast";

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
        <div className="card">
          <div className="card-desc">
            <h1>Admin Page</h1>
            <p>Here you are able to create, edit, and delete cakes</p>
          </div>
        </div>
        <div className="card">
          <CakeForm />
          <AdminSearch onSelectCake={handleSelectCake} />
          <AdminForm selectedCake={selectedCake} onDelete={handleCakeDeleted} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminPage;

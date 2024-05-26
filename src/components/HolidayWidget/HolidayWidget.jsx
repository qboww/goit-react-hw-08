import { useEffect, useState } from "react";
import fetchHoliday from "../../config/holidayApi";
import Loader from "../Loader/Loader";
import { Toaster, toast } from "react-hot-toast";
import css from "./HolidayWidget.module.css";

const HolidayWidget = () => {
  const [holiday, setHoliday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHoliday(setHoliday, setLoading, setError);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    toast(error);
    return <Toaster />;
  }

  if (!holiday) {
    return (
      <div className="sub-card">
        <h2 className="component-title">Holiday of the day!</h2>
        <div className={css.holidayContainer}>
          <h2 className={css.holidayName}></h2>
          <p className={css.holidayDescription}>
            Today we have nothing to celebrate
          </p>
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="sub-card">
      <h2 className="component-title">Holiday of the day!</h2>
      <div className={css.holidayContainer}>
        <h2 className={css.holidayName}>{holiday.name}</h2>
        <p className={css.holidayDescription}>{holiday.description}</p>
        <Toaster />
      </div>
    </div>
  );
};

export default HolidayWidget;

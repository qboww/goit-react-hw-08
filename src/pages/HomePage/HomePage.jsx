import HolidayWidget from "../../components/HolidayWidget/HolidayWidget";

const HomePage = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="card">
          <div className="card-desc">
            <h1>Courses Tracker</h1>
            <p>Lets dive into learning together!</p>
          </div>
        </div>
        <div className="card">
          <HolidayWidget />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

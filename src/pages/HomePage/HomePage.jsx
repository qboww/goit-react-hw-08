import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className="container">
      <div className={css.subContainer}>
        <div className={css.wrapper}>
          <h1>Courses Tracker</h1>
          <p>Lets dive into learning together!</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

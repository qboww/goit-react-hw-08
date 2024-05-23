import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className="container">
      <div className={css.subContainer}>
        <div className={css.wrapper}>
          <h1>Your Phonebook</h1>
          <p>Welcome to your contact book!</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

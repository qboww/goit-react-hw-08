import css from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <div className="container">
      <div className={css.subContainer}>
        <div className={css.wrapper}>
          <h1> Page not found</h1>
          <p>{`Sorry, the page you are looking for does not exist.`}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

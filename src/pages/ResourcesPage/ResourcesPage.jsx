import css from "./ResourcesPage.module.css";

const videos = [
  "https://www.youtube.com/watch?v=vfcqsP99U90",
  "https://www.youtube.com/watch?v=c3Cn4xYfxJY",
  "https://www.youtube.com/watch?v=JyeWoqWsQFo",
];

const getYouTubeThumbnail = (url) => {
  const videoId = url.split("v=")[1];
  const ampersandPosition = videoId.indexOf("&");
  return `https://img.youtube.com/vi/${
    ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId
  }/hqdefault.jpg`;
};

const ResourcesPage = () => {
  return (
    <div className="container">
      <div className={css.resContainer}>
        <div className={css.subContainer}>
          <div className={css.wrapper}>
            <h1>Learning Resources</h1>
            <p>Lets dive into learning together!</p>
          </div>
        </div>

        <div className={css.subContainer}>
          <div className={css.wrapperDefault}>
            <h2 className={css.channelsHeader}>Popular documentations</h2>
            <ol className={css.linksList}>
              <li>
                <a
                  href="https://reactjs.org/docs/getting-started.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://redux.js.org/introduction/getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Redux Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://redux-toolkit.js.org/introduction/getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Redux Toolkit Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://formik.org/docs/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Formik Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://axios-http.com/docs/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Axios Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  JavaScript Documentation (MDN)
                </a>
              </li>
              <li>
                <a
                  href="https://www.w3schools.com/css/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CSS Documentation (W3Schools)
                </a>
              </li>
            </ol>
          </div>
          <div className={css.wrapperDefault}>
            <h2 className={css.channelsHeader}>Freecodecamp videos</h2>
            <ul className={css.videoList}>
              {videos.map((video, index) => (
                <li key={index} className={css.videoItem}>
                  <a href={video} target="_blank" rel="noopener noreferrer">
                    <img
                      src={getYouTubeThumbnail(video)}
                      alt={`Video ${index + 1}`}
                      className={css.thumbnail}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;

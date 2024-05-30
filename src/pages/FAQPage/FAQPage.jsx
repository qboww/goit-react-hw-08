import css from "./FAQPage.module.css";

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
      <div className="wrapper">
        <div className="sub-card">
          <h1 className={css.header}>Our partners</h1>
          <ul className={css.partList}>
            <li>
              <a href="https://lvivcroissants.com/ua/">
                <img className={css.partImg} src="../../lviv.png" alt="lviv" />
              </a>
            </li>
            <li>
              <a href="https://www.starbucks.com/">
                <img
                  className={css.partImg}
                  src="../../starbucks.png"
                  alt="starbucks"
                />
              </a>
            </li>
            <li>
              <a href="https://vatsak.com.ua/">
                <img
                  className={css.partImg}
                  src="../../vatsak.jpg"
                  alt="vatsak"
                />
              </a>
            </li>
            <li>
              <a href="https://www.avk.ua/ua/uk">
                <img className={css.partImg} src="../../avk.jpg" alt="avk" />
              </a>
            </li>
          </ul>
        </div>
        <div className="sub-card">
          <div>
            <h2 className="component-title">How to order a cake?</h2>
            <ol className={css.linksList}>
              <li>Find loved one</li>
              <li>Try better, use filters, search and sort!</li>
              <li>Press order button</li>
              <li>Fill in order form</li>
              <li>Keep patience...</li>
              <li>Now its PROCESSED!</li>
              <li>Done</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;

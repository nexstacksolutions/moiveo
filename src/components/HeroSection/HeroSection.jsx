import styles from "./HeroSection.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMedia } from "../../context/MediaContext";
import { Link } from "react-router-dom";
import NavBtns from "../NavBtns/NavBtns";

function BannerInfo({ bannerData }) {
  return (
    <div className={`${styles.bannerInfo} col`}>
      <h1>{bannerData.title || bannerData.name}</h1>
      <p>{bannerData.overview}</p>
      <div className={`${styles.metaData} row`}>
        <span>Rating : {bannerData.vote_average.toFixed(1)}+</span>
        <span>|</span>
        <span>View : {bannerData.vote_count}</span>
      </div>
      <Link
        to={`/${
          bannerData.media_type === "movie" ? "movies" : bannerData.media_type
        }/${bannerData.id}`}
      >
        <button className="btn">Play Now</button>
      </Link>
    </div>
  );
}

function FeatureBanner({ bannerData, IMAGE_BASE_URL, currentBanner }) {
  return (
    <div
      className={`${styles.featureBanner} col`}
      style={{ transform: `translateX(-${currentBanner * 100}%)` }}
    >
      <img
        src={`${IMAGE_BASE_URL}${bannerData.backdrop_path || "default.jpg"}`}
        alt={bannerData.title || "No Title"}
      />

      <div className={styles.gradientOverlay}></div>
      <BannerInfo bannerData={bannerData} />
    </div>
  );
}

function HeroSection({ bannerList }) {
  const { IMAGE_BASE_URL } = useMedia();
  const [currentBanner, setCurrentBanner] = useState(0);

  const handleBannerChange = useCallback(
    (direction) => {
      setCurrentBanner((prev) => {
        return direction === "next"
          ? (prev + 1) % bannerList.length
          : (prev - 1 + bannerList.length) % bannerList.length;
      });
    },
    [bannerList.length]
  );

  const handleNext = useCallback(
    () => handleBannerChange("next"),
    [handleBannerChange]
  );

  const handlePrev = () => handleBannerChange("prev");

  const featureBanners = useMemo(
    () =>
      bannerList.map((data) => (
        <FeatureBanner
          key={data.id}
          bannerData={data}
          IMAGE_BASE_URL={IMAGE_BASE_URL}
          currentBanner={currentBanner}
        />
      )),
    [bannerList, IMAGE_BASE_URL, currentBanner]
  );

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, [handleNext, bannerList.length]);

  return (
    <section className={`${styles.heroSection} row`}>
      {featureBanners}
      <NavBtns handleNext={handleNext} handlePrev={handlePrev} />
    </section>
  );
}

export default HeroSection;

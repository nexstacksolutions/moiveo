import styles from "../styles/Details.module.css"; // Import module CSS
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import moment from "moment";
import Divider from "../components/Divider/Divider";
import ShowcaseGrid from "../components/ShowcaseGrid/ShowcaseGrid";
import VideoPlay from "../components/VideoPlay/VideoPlay";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../pages/Error";
import { useMedia } from "../context/MediaContext";

const DetailsPage = () => {
  const { explore, id } = useParams();
  const mediaType = explore === "movies" ? explore.slice(0, -1) : explore; // Remove the trailing 's'
  const { IMAGE_BASE_URL } = useMedia();

  const { data, loading, error } = useFetchDetails(id, mediaType);

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const handlePlayVideo = (id) => {
    setPlayVideoId(id);
    setPlayVideo(true);
  };

  const duration = data.details?.runtime
    ? (data.details?.runtime / 60).toFixed(1).split(".")
    : ["0", "0"];

  const writer = data.cast?.crew
    ?.filter((el) => el.job === "Writer")
    ?.map((el) => el.name)
    ?.join(", ");

  if (loading) return <LoadingSpinner />;
  if (error)
    return <ErrorPage errorMsg="Failed to load details. Please try again." />;

  return (
    <main className={styles.detailsPage}>
      <div className={styles.banner}>
        <img
          src={IMAGE_BASE_URL + data.details?.backdrop_path}
          className={styles.bannerImage}
          alt={data.details?.title || data.details?.name}
        />
        <div className={styles.bannerOverlay}></div>
      </div>

      <div className={`${styles.container} row container`}>
        <div className={styles.posterContainer}>
          <img
            src={IMAGE_BASE_URL + data.details?.poster_path}
            className={styles.posterImage}
            alt={data.details?.title || data.details?.name}
          />
          <button
            onClick={() => handlePlayVideo(data.details?.id)}
            className={styles.playButton}
          >
            Play Now
          </button>
        </div>

        <div className={styles.detailsContent}>
          <h1 className={styles.title}>
            {data.details?.title || data.details?.name}
          </h1>
          <p className={styles.tagline}>{data.details?.tagline}</p>

          <Divider />

          <div className={`${styles.stats} row`}>
            <p>Rating: {Number(data.details?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View: {Number(data.details?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration: {duration[0]}h {duration[1]}m
            </p>
          </div>

          <Divider />

          <div className={styles.overview}>
            <h3 className={styles.sectionTitle}>Overview</h3>
            <p>{data.details?.overview}</p>

            <Divider />
            <div className={`${styles.additionalInfo} row`}>
              <p>Status: {data.details?.status}</p>
              <span>|</span>
              <p className="row">
                <span>Release Date:</span>
                <span>
                  {moment(data.details?.release_date).format("MMMM Do YYYY")}
                </span>
              </p>
              <span>|</span>
              <p>Revenue: ${data.details?.revenue?.toLocaleString()}</p>
            </div>

            <Divider />
          </div>

          <div className={styles.crew}>
            <p className="row">
              <span className={styles.label}>Director:</span>
              <span>{data.cast?.crew[0]?.name}</span>
            </p>

            <Divider />

            <p>
              <span className={styles.label}>Writer:</span> {writer}
            </p>
          </div>

          <Divider />

          <h2 className={styles.castTitle}>Cast:</h2>
          <div className={`${styles.castGrid} row`}>
            {data.cast?.cast
              ?.filter((el) => el.profile_path)
              .map((starCast, index) => (
                <div key={index}>
                  <img
                    src={IMAGE_BASE_URL + starCast?.profile_path}
                    className={styles.castImage}
                    alt={starCast?.name}
                  />
                  <p className={styles.castName}>{starCast?.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className={`${styles.relatedShowCase} col `}>
        <ShowcaseGrid
          mediaList={data.similar}
          showcaseName={`Similar ${explore}`}
          mediaType={explore}
        />

        <ShowcaseGrid
          mediaList={data.recommendations}
          showcaseName={`Recommendation ${explore}`}
          mediaType={explore}
        />
      </div>

      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          mediaType={mediaType}
        />
      )}
    </main>
  );
};

export default DetailsPage;

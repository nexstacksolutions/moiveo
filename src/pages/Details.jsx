import styles from "../styles/Details.module.css"; // Import module CSS
import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import moment from "moment";
import Divider from "../components/Divider/Divider";
import ShowcaseGrid from "../components/ShowcaseGrid/ShowcaseGrid";
import VideoPlay from "../components/VideoPlay/VideoPlay";

import { useMedia } from "../context/MediaContext";

const DetailsPage = () => {
  const { explore } = useParams();
  const { IMAGE_BASE_URL } = useMedia();

  const { cast, details, recommendations, similar } = useLoaderData();

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const handlePlayVideo = (id) => {
    setPlayVideoId(id);
    setPlayVideo(true);
  };

  const duration = details?.runtime
    ? (details?.runtime / 60).toFixed(1).split(".")
    : ["0", "0"];

  const writer = cast?.crew
    ?.filter((el) => el.job === "Writer")
    ?.map((el) => el.name)
    ?.join(", ");

  return (
    <main className={styles.detailsPage}>
      <div className={styles.banner}>
        <img
          src={IMAGE_BASE_URL + details?.backdrop_path}
          className={styles.bannerImage}
          alt={details?.title || details?.name}
        />
        <div className={styles.bannerOverlay}></div>
      </div>

      <div className={`${styles.container} row container`}>
        <div className={styles.posterContainer}>
          <img
            src={IMAGE_BASE_URL + details?.poster_path}
            className={styles.posterImage}
            alt={details?.title || details?.name}
          />
          <button
            onClick={() => handlePlayVideo(details?.id)}
            className={styles.playButton}
          >
            Play Now
          </button>
        </div>

        <div className={styles.detailsContent}>
          <h1 className={styles.title}>{details?.title || details?.name}</h1>
          <p className={styles.tagline}>{details?.tagline}</p>

          <Divider />

          <div className={`${styles.stats} row`}>
            <p>Rating: {Number(details?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View: {Number(details?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration: {duration[0]}h {duration[1]}m
            </p>
          </div>

          <Divider />

          <div className={styles.overview}>
            <h3 className={styles.sectionTitle}>Overview</h3>
            <p>{details?.overview}</p>

            <Divider />
            <div className={`${styles.additionalInfo} row`}>
              <p>Status: {details?.status}</p>
              <span>|</span>
              <p className="row">
                <span>Release Date:</span>
                <span>
                  {moment(details?.release_date).format("MMMM Do YYYY")}
                </span>
              </p>
              <span>|</span>
              <p>Revenue: ${details?.revenue?.toLocaleString()}</p>
            </div>

            <Divider />
          </div>

          <div className={styles.crew}>
            <p className="row">
              <span className={styles.label}>Director:</span>
              <span>{cast?.crew[0]?.name}</span>
            </p>

            <Divider />

            <p>
              <span className={styles.label}>Writer:</span> {writer}
            </p>
          </div>

          <Divider />

          <h2 className={styles.castTitle}>Cast:</h2>
          <div className={`${styles.castGrid} row`}>
            {cast?.cast
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
          mediaList={similar}
          showcaseName={`Similar ${explore}`}
          mediaType={explore}
        />

        <ShowcaseGrid
          mediaList={recommendations}
          showcaseName={`Recommendation ${explore}`}
          mediaType={explore}
        />
      </div>

      {playVideo && (
        <VideoPlay
          videoId={playVideoId}
          closeVideo={() => setPlayVideo(false)}
          mediaType={explore}
        />
      )}
    </main>
  );
};

export default DetailsPage;

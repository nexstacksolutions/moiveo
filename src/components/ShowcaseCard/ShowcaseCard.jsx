import styles from "./ShowcaseCard.module.css";
import { useMedia } from "../../context/MediaContext";
import { Link } from "react-router-dom";
import moment from "moment";
import { useMemo } from "react";

function ShowcaseCard({
  mediaData,
  showcaseName,
  index,
  currentCard,
  mediaType,
  explorePage,
}) {
  const { IMAGE_BASE_URL } = useMedia();

  const releaseDate = useMemo(
    () => mediaData.release_date || mediaData.first_air_date,
    [mediaData.release_date, mediaData.first_air_date]
  );

  return (
    <Link
      to={`/${
        mediaType ||
        `${mediaData.media_type === "movie" ? "movies" : mediaData.media_type}`
      }/${mediaData.id}`}
      className={`${styles.showcaseCard} ${explorePage && styles.explore}`}
      style={{ transform: `translateX(-${currentCard * 100}%)` }}
    >
      <div className={styles.cardImage}>
        <img
          src={`${IMAGE_BASE_URL}${
            mediaData.poster_path || "default-poster.jpg"
          }`}
          alt={mediaData.title || mediaData.name || "No Title"}
          decoding="async"
        />
      </div>

      {showcaseName === "Now Playing" && (
        <span className={styles.cardLabel}>#{index} Trending</span>
      )}

      <div className={`${styles.cardContent} col`}>
        <h3 className={styles.cardTitle}>
          {mediaData.title || mediaData.name}
        </h3>
        <div className={`${styles.cardMeta} row`}>
          <span>{moment(releaseDate).format("MMM Do YYYY")}</span>
          <span>
            Rating :{" "}
            {mediaData.vote_average && mediaData.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ShowcaseCard;

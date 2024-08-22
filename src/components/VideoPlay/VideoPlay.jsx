import React, { useCallback, useRef } from "react";
import { IoClose } from "react-icons/io5";
import useFetchVideo from "../../hooks/useFetchVideo";
import styles from "./VideoPlay.module.css"; // Import module CSS

const VideoPlay = ({ data, close, mediaType }) => {
  const { mediaList } = useFetchVideo(`/${mediaType}/${data}/videos`);
  const videoContainerRef = useRef(null);

  // Function to handle click outside of video container
  const handleClickOutside = useCallback(
    (event) => {
      if (
        videoContainerRef.current &&
        !videoContainerRef.current.contains(event.target)
      ) {
        close();
      }
    },
    [close]
  );

  return (
    <section onClick={handleClickOutside} className={styles.overlay}>
      <div className={styles.videoContainer} ref={videoContainerRef}>
        <button onClick={close} className={styles.closeButton}>
          <IoClose />
        </button>
        <iframe
          src={
            mediaList?.results &&
            `https://www.youtube.com/embed/${mediaList?.results[0]?.key}`
          }
          className={styles.videoFrame}
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default VideoPlay;

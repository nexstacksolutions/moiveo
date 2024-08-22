import styles from "./ShowcaseGrid.module.css";
import ShowcaseCard from "../ShowcaseCard/ShowcaseCard";
import NavBtns from "../NavBtns/NavBtns";
import { useCallback, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { memo } from "react";

const SectionHeader = memo(({ showcaseName }) => {
  return (
    <header className={styles.sectionHeader}>
      <h2>{showcaseName}</h2>
    </header>
  );
});

SectionHeader.displayName = "SectionHeader";

const SectionContent = memo(({ mediaList, showcaseName, mediaType }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const { explore, id } = useParams();
  const location = useLocation();
  const containerRef = useRef(null);

  const explorePage = explore || location.pathname === "/search" || id;

  const handleNext = useCallback(() => {
    containerRef.current.scrollLeft += 226;
  }, []);

  const handlePrev = useCallback(() => {
    containerRef.current.scrollLeft -= 226;
  }, []);

  return (
    <>
      <div
        className={`${styles.sectionContent} ${
          explorePage && !id && styles.explore
        } row`}
        ref={containerRef}
      >
        {mediaList.map((item, index) => (
          <ShowcaseCard
            showcaseName={showcaseName}
            index={index + 1}
            key={item.id}
            mediaData={item}
            currentCard={currentCard}
            mediaType={mediaType}
            explorePage={explorePage && !id}
          />
        ))}
      </div>

      {!explorePage || id ? (
        <NavBtns handleNext={handleNext} handlePrev={handlePrev} />
      ) : null}
    </>
  );
});

SectionContent.displayName = "SectionContent";

function ShowcaseGrid({ mediaList, showcaseName, mediaType }) {
  const memoizedShowcaseName = useMemo(() => showcaseName, [showcaseName]);
  const memoizedMediaList = useMemo(() => mediaList, [mediaList]);
  const memoizedMediaType = useMemo(() => mediaType, [mediaType]);

  return (
    <section className={`${styles.showcaseGrid} col container`}>
      <SectionHeader showcaseName={memoizedShowcaseName} />
      <SectionContent
        showcaseName={memoizedShowcaseName}
        mediaList={memoizedMediaList}
        mediaType={memoizedMediaType}
      />
    </section>
  );
}

export default ShowcaseGrid;

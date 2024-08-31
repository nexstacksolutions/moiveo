import styles from "../styles/Explore.module.css";
import ShowcaseGrid from "../components/ShowcaseGrid/ShowcaseGrid";
import useFetchExplore from "../hooks/useFetchExplore";
import { useLoaderData, useParams } from "react-router-dom";

function Explore() {
  const { explore } = useParams();
  const initialData = useLoaderData();
  const { mediaList } = useFetchExplore(explore, initialData);

  return (
    <main className={styles.explore}>
      <ShowcaseGrid
        showcaseName={`Popular ${explore === "tv" ? "TV Shows" : "Movies"}`}
        mediaList={mediaList}
        mediaType={explore === "movies" ? "movie" : "tv"}
      />
    </main>
  );
}

export default Explore;

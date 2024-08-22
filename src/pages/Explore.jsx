import styles from "../styles/Explore.module.css";
import ShowcaseGrid from "../components/ShowcaseGrid/ShowcaseGrid";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import useFetchExplore from "../hooks/useFetchExplore";
import ErrorPage from "../pages/Error";
import { useParams } from "react-router-dom";

function Explore() {
  const { explore } = useParams();
  const { mediaList, loading, error } = useFetchExplore(explore);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage errorMsg={error.message} />;

  return (
    <main className={styles.explore}>
      <ShowcaseGrid
        showcaseName={`Popular ${explore === "tv" ? "TV Shows" : "Movies"}`}
        mediaList={mediaList}
        mediaType={explore}
      />
    </main>
  );
}

export default Explore;

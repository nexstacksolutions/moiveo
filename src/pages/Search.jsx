import styles from "../styles/Search.module.css";
import ShowcaseGrid from "../components/ShowcaseGrid/ShowcaseGrid";
import useFetchSearch from "../hooks/useFetchSearch";
import { useLocation, useLoaderData } from "react-router-dom";
import SearchGuide from "../components/SearchGuide/SearchGuide ";
import EmptySearch from "../components/EmptySearch/EmptySearch";

function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const initialData = useLoaderData();
  const { searchResults } = useFetchSearch(query, initialData);

  if (query && (!searchResults || searchResults.length === 0))
    return <EmptySearch />;

  return (
    <main className={styles.search}>
      {query ? (
        <ShowcaseGrid
          showcaseName={"Search Results"}
          mediaList={searchResults}
        />
      ) : (
        <SearchGuide />
      )}
    </main>
  );
}

export default Search;

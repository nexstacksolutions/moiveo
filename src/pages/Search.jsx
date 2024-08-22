import styles from "../styles/Search.module.css";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../pages/Error";
import ShowcaseGrid from "../components/ShowcaseGrid/ShowcaseGrid";
import useFetchSearch from "../hooks/useFetchSearch";
import { useLocation } from "react-router-dom";
import SearchGuide from "../components/SearchGuide/SearchGuide ";
import EmptySearch from "../components/EmptySearch/EmptySearch";

function Search() {
  const location = useLocation();
  const query = location?.search?.slice(3); // Get the query from URL

  const { searchResults, loading, error } = useFetchSearch(query);

  // Handle loading, error, and no results states.
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage errorMsg={error.message} />;
  if (query && (!searchResults || searchResults.length === 0))
    return <EmptySearch />;

  return (
    <main className={styles.search}>
      {query ? (
        // Show search results if there is a query
        <ShowcaseGrid
          showcaseName={"Search Results"}
          mediaList={searchResults}
        />
      ) : (
        // Show initial content if there is no query
        <SearchGuide />
      )}
    </main>
  );
}

export default Search;

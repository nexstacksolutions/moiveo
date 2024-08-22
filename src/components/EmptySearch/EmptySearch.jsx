import styles from "./EmptySearch.module.css";

const EmptySearch = () => {
  return (
    <main className={styles.emptySearch}>
      <h2>No results found</h2>
      <p>
        We couldn't find any results for your search. Please try a different
        search term or refine your query.
      </p>
    </main>
  );
};

export default EmptySearch;

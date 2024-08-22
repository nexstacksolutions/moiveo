import styles from "./SearchGuide.module.css";
import SearchBox from "../SearchBox/SearchBox";

function SearchGuide() {
  return (
    <main className={styles.searchGuide}>
      <h1 className={styles.title}>Welcome to Your Personalized Search Hub</h1>
      <p className={styles.subtitle}>
        Discover a world of information, tailored just for you.
      </p>
      <SearchBox />
      <section className={styles.section}>
        <h2>How to Get Started:</h2>
        <p>
          Simply enter a keyword or phrase in the search box above to begin your
          journey. Whether you're looking for the latest trends, helpful
          articles, or specific topics, our powerful search engine will deliver
          the most relevant results in seconds.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Popular Categories:</h2>
        <ul className={styles.categoryList}>
          <li>Technology</li>
          <li>Health & Wellness</li>
          <li>Travel & Adventure</li>
          <li>Business & Finance</li>
          <li>Entertainment</li>
          <li>Science & Innovation</li>
        </ul>
        <p>
          Explore our popular categories or browse through our carefully curated
          recommendations to find something that piques your interest.
        </p>
      </section>
    </main>
  );
}

export default SearchGuide;

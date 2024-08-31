import styles from "./SearchBox.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { Form } from "react-router-dom";

const SearchBox = () => {
  return (
    <Form method="GET" action="/search" className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search..."
        name="q"
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        <IoSearchOutline className={styles.searchIcon} />
      </button>
    </Form>
  );
};

export default SearchBox;

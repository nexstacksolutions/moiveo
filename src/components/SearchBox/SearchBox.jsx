import styles from "./SearchBox.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { useMedia } from "../../context/MediaContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { handleSearch } = useMedia();

  return (
    <form
      onSubmit={(e) => handleSearch(e, query, navigate)}
      className={styles.searchBox}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        <IoSearchOutline className={styles.searchIcon} />
      </button>
    </form>
  );
};

export default SearchBox;

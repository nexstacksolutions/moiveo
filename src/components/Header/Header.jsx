import styles from "./Header.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../../constant/navigation";
import MobileNavigation from "./mobileNav/MobileNav";
import { useMedia } from "../../context/MediaContext";
import { useState, useEffect } from "react";
import { debounce } from "lodash"; // Install lodash library

function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { handleSearch } = useMedia();

  useEffect(() => {
    // Debounce the handleSearch function to optimize search performance
    const debouncedHandleSearch = debounce(handleSearch, 500);
    debouncedHandleSearch(null, query, navigate);

    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [query, handleSearch, navigate]);

  return (
    <header className={`${styles.header} row`}>
      <Link to={"/"} className={styles.logo}>
        <img src="/logo.png" alt="Logo" decoding="async" />
      </Link>
      <nav className="row">
        {navigation.map((nav, index) => (
          <NavLink
            key={nav.label + "header" + index}
            to={nav.href}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            {nav.label}
          </NavLink>
        ))}
      </nav>
      <MobileNavigation />
      <div className={`${styles.actionBox} row`}>
        <form
          onSubmit={(e) => handleSearch(e, query, navigate)}
          className={`${styles.searchBar} row`}
        >
          <input
            value={query}
            type="text"
            placeholder="Search here..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <IoSearchOutline />
        </form>
        <div className={styles.users}>
          <img src="/user.png" alt="User" />
        </div>
      </div>
    </header>
  );
}

export default Header;

import { mobileNavigation } from "../../../constant/navigation";
import { Link, useLocation } from "react-router-dom";
import styles from "./MobileNav.module.css";

function MobileNavigation() {
  const location = useLocation(); // Get the current location

  return (
    <section className={`${styles.mobileNavigation} row`}>
      <div className={`${styles.navigationContainer} row`}>
        {mobileNavigation.map((nav, index) => {
          const isActive = location.pathname === nav.href; // Determine if the link is active

          return (
            <Link
              key={nav.label + "mobile-navigation"}
              to={nav.href}
              className={`${styles.navLink} ${
                isActive ? styles.navLinkActive : ""
              }`}
            >
              <div className={`${styles.icon} row`}>{nav.icon}</div>
              <p className={styles.label}>{nav.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default MobileNavigation;

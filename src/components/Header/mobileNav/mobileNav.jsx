import { mobileNavigation } from "../../../constant/navigation";
import { NavLink } from "react-router-dom";
import styles from "./MobileNav.module.css";

function MobileNavigation() {
  return (
    <section className={`${styles.mobileNavigation} row`}>
      <div className={`${styles.navigationContainer} row`}>
        {mobileNavigation.map((nav, index) => {
          return (
            <NavLink
              key={nav.label + "mobile-navigation"}
              to={nav.href}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
            >
              <div className={`${styles.icon} row`}>{nav.icon}</div>
              <p className={styles.label}>{nav.label}</p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}

export default MobileNavigation;

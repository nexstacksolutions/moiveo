import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className="row">
        <Link>About</Link>
        <Link>Contact</Link>
      </nav>

      <p>Create By TechStack Solutions with Zeeshan</p>
    </footer>
  );
}

export default Footer;

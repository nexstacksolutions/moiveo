import styles from "../styles/Error.module.css";
import { Link } from "react-router-dom";

function ErrorPage({ errorMsg }) {
  console.log(errorMsg);

  return (
    <main className={styles.error}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorTitle}>Something went wrong</h1>
        <p className={styles.errorMessage}>
          We're sorry, but the page you're looking for doesn't exist or there
          was an issue fetching the data.
        </p>
        <p className={styles.errorMessage}>{errorMsg}</p>
        <Link to="/" className={styles.homeLink}>
          Go back to Home
        </Link>
      </div>
    </main>
  );
}

export default ErrorPage;

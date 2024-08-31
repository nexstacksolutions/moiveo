import styles from "../styles/Error.module.css";
import { Link, useNavigate, useRouteError } from "react-router-dom";

function ErrorBoundary({ errorMsg }) {
  const error = useRouteError();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <main className={styles.error}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorTitle}>
          {error?.status && error?.statusText
            ? `${error.status} ${error.statusText}`
            : "Something went wrong"}
        </h1>
        <p className={styles.errorMessage}>{error?.data || errorMsg}</p>
        <p className={styles.errorMessage}>
          We're sorry, but the page you're looking for doesn't exist or there
          was an issue fetching the data.
        </p>

        <div className={`${styles.actionBtns} row`}>
          <Link to="/" className={styles.homeLink}>
            Go back to Home
          </Link>
          <Link onClick={handleGoBack} className={styles.prevPageLink}>
            back to PrevPage
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ErrorBoundary;

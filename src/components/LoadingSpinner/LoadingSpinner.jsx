import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles["loading-spinner"]}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default LoadingSpinner;

import { useState, useEffect, useCallback } from "react";
import styles from "./ProgressBar.module.css";

function ProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Function to calculate scroll percentage
  const calculateScrollPercentage = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    const totalScroll = fullHeight - windowHeight;
    const percentage = (scrollTop / totalScroll) * 100;

    return percentage;
  };

  // Update scroll percentage on scroll
  const handleScroll = useCallback(() => {
    const percentage = calculateScrollPercentage();
    setScrollPercentage(percentage);
  }, []); // Empty dependency array

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={styles.progressBarWrapper}>
      <div
        className={styles.progressBar}
        style={{ width: `${scrollPercentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;

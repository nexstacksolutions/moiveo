import styles from "./NavBtns.module.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

function NavBtns({ handleNext, handlePrev }) {
  return (
    <>
      <button className={styles.navBtns} onClick={handlePrev}>
        <FaAngleLeft />
      </button>
      <button className={styles.navBtns} onClick={handleNext}>
        <FaAngleRight />
      </button>
    </>
  );
}

export default NavBtns;

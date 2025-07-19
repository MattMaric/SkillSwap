import styles from "./HamburgerToggle.module.css";

const HamburgerToggle = ({ isOpen, toggleNavbar, toggleRef }) => {
  return (
    <button
      ref={toggleRef}
      className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
      onClick={toggleNavbar}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default HamburgerToggle;

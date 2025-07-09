import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <h1 className={styles.title}>Welcome to SkillSwap</h1>
        <p className={styles.subtitle}>
          Exchange skills, learn new things, and grow together.
        </p>
        <Link to="/explore" className={styles.btnHero}>
          Explore Swaps
        </Link>
      </div>
    </section>
  );
};

export default Hero;

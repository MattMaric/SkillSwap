import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSearch,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./HowItWorks.module.css";

const HowItWorks = () => {
  return (
    <section>
      <div className="container text-center py-5">
        <h2>How It Works</h2>
        <div className={styles.gridContainer}>
          <div className={styles.cardDiv}>
            <FontAwesomeIcon icon={faUserPlus} size="4x" className="mb-4" />
            <h4>Create Profile</h4>
            <p>
              Sign up and customize your profile to showcase your skills and
              what you're looking to learn.
            </p>
          </div>
          <div className={styles.cardDiv}>
            <FontAwesomeIcon icon={faSearch} size="4x" className="mb-4" />
            <h4>Explore Swaps</h4>
            <p>
              Browse skill swap opportunities, find interesting people, and
              connect with them.
            </p>
          </div>
          <div className={styles.cardDiv}>
            <FontAwesomeIcon icon={faExchangeAlt} size="4x" className="mb-4" />
            <h4>Start Swapping</h4>
            <p>
              Comment, exchange ideas, and start swapping skills to grow
              together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

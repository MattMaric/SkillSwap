import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faComments,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Features.module.css";

const Features = () => {
  const featuresList = [
    {
      icon: faHandshake,
      title: "Easy Skill Swapping",
      description:
        "Quickly create, share, and discover swap opportunities with other learners.",
    },
    {
      icon: faComments,
      title: "Engage & Connect",
      description:
        "Comment, like, and interact with posts to build your learning community.",
    },
    {
      icon: faBell,
      title: "Stay Notified",
      description:
        "Receive updates when someone comments on your swaps or engages with you.",
    },
    {
      icon: faUserCircle,
      title: "Personal Dashboard",
      description:
        "Manage your swaps and track all your activities in your personalized profile.",
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <h2 className={styles.title}>Features</h2>
        <div className={styles.featuresGrid}>
          {featuresList.map((feature, index) => (
            <div className={styles.featureCard} key={index}>
              <FontAwesomeIcon icon={feature.icon} className={styles.icon} />
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

import styles from "./Testimonials.module.css";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    text: "SkillSwap helped me learn design in exchange for coding help. Amazing community!",
  },
  {
    id: 2,
    name: "Mark Thompson",
    text: "A perfect place to share skills and make friends worldwide.",
  },
  {
    id: 3,
    name: "Sophie Lee",
    text: "Easy to use and I found a mentor for frontend development here!",
  },
  {
    id: 4,
    name: "David Kim",
    text: "Fantastic experience exchanging my marketing skills for coding lessons!",
  },
];

const Testimonials = () => {
  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.heading}>What Our Users Say</h2>
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className={styles.testimonialCard}>
          <p className={styles.text}>"{testimonial.text}"</p>
          <h5 className={styles.name}>— {testimonial.name}</h5>
        </div>
      ))}
    </section>
  );
};

export default Testimonials;

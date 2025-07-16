import Hero from "../components/home-blocks/hero/Hero";
import HowItWorks from "../components/home-blocks/how-it-works/HowItWorks";
import Features from "../components/home-blocks/features/Features";
import Testimonials from "../components/home-blocks/testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
    </div>
  );
};

export default Home;

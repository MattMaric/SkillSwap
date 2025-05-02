import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to SkillSwap App</h1>
      <p>Exchange items quickly and easily.</p>
      <Link className="btn btn-primary btn-lg mt-3" to="/new-swap">
        Start Creating a Swap
      </Link>
    </div>
  )
};

export default Home;
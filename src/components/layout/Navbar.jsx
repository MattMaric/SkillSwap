import { Link, NavLink } from "react-router-dom";
import '../../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand" to="/">SkillSwap</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-lg-2">
          <li className="nav-item">
            <NavLink className="nav-link" to="/explore">Explore</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/swaps">My Swaps</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/favorites">Favorites</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
          </li>
          <li className="nav-item text-center">
            <Link className="btn btn-primary text-white ms-2" to="/new-swap">
              + Create Swap
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default Navbar;
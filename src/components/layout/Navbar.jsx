import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsByUser } from "../../features/notifications/notificationsSlice";
import "../../styles/navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchNotificationsByUser(user.id));
    }
  }, [dispatch, user]);

  const userNotifications = notifications.filter(
    (n) => n.recipientId === user?.id
  );

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand" to="/">
        SkillSwap
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-lg-2">
          <li className="nav-item">
            <NavLink className="nav-link" to="/explore">
              Explore
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/swaps">
              My Swaps
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/favorites">
              Favorites
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>

          {/* Notifications Dropdown */}
          <li className="nav-item dropdown">
            <button
              className="btn btn-link nav-link dropdown-toggle position-relative"
              data-bs-toggle="dropdown"
            >
              🔔
              {unreadCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {unreadCount}
                </span>
              )}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {userNotifications.length === 0 ? (
                <li>
                  <span className="dropdown-item text-muted">
                    No notifications
                  </span>
                </li>
              ) : (
                userNotifications.map((n) => (
                  <li key={n.id}>
                    <Link to={`/swaps/${n.swapId}`} className="dropdown-item">
                      {n.message}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </li>

          <li className="nav-item text-center">
            <Link className="btn btn-primary text-white ms-2" to="/new-swap">
              + Create Swap
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

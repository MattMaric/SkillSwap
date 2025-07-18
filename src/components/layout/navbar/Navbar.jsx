import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationsByUser,
  markNotificationAsRead,
} from "../../../features/notifications/notificationsSlice";
import styles from "./Navbar.module.css";
import HamburgerToggle from "../../hamburger-toggle/HamburgerToggle";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notifications);
  const [isOpen, setIsOpen] = useState(false);

  const navListRef = useRef(null);
  const notificationRef = useRef(null);
  const toggleRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideNavList =
        navListRef.current && !navListRef.current.contains(event.target);
      const clickedNotification =
        notificationRef.current &&
        notificationRef.current.contains(event.target);
      const clickedToggle =
        toggleRef.current && toggleRef.current.contains(event.target);

      if (
        isOpen &&
        clickedOutsideNavList &&
        !clickedNotification &&
        !clickedToggle
      ) {
        closeNavbar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchNotificationsByUser(user.id));
    }
  }, [dispatch, user]);

  const userNotifications = notifications.filter(
    (n) => n.recipientId === user?.id
  );
  const unreadNotifications = userNotifications.filter((n) => !n.read);
  const unreadCount = unreadNotifications.length;

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-dark px-3 ${styles.navbar}`}
    >
      <NavLink className={`navbar-brand ${styles.navbarBrand}`} to="/">
        SkillSwap
      </NavLink>

      <HamburgerToggle
        isOpen={isOpen}
        toggleNavbar={toggleNavbar}
        toggleRef={toggleRef}
      />

      <div
        className={`navbar-collapse ${
          isOpen ? styles.navOpen : styles.navClosed
        }`}
      >
        <ul ref={navListRef} className="navbar-nav ms-auto gap-lg-2">
          {[
            { to: "/", label: "Home" },
            { to: "/explore", label: "Explore" },
            { to: "/swaps", label: "My Swaps" },
            { to: "/favorites", label: "Favorites" },
            { to: "/profile", label: "Profile" },
          ].map((link) => (
            <li className="nav-item" key={link.to}>
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${styles.navLink} ${
                    isActive ? styles.navLinkActive : ""
                  }`
                }
                to={link.to}
                onClick={closeNavbar}
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          {/* Notifications Dropdown */}
          <li ref={notificationRef} className="nav-item dropdown">
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
              {unreadNotifications.length === 0 ? (
                <li>
                  <span className="dropdown-item text-muted">
                    No notifications
                  </span>
                </li>
              ) : (
                unreadNotifications.map((n) => (
                  <li key={n.id}>
                    <Link
                      to={`/swaps/${n.swapId}`}
                      className="dropdown-item"
                      onClick={() => {
                        dispatch(markNotificationAsRead(n.id));
                      }}
                    >
                      {n.message}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </li>

          <li className="nav-item text-center">
            <Link
              className="btn btn-primary text-white ms-2"
              to="/new-swap"
              onClick={closeNavbar}
            >
              + Create Swap
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

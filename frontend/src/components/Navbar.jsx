import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: "⌂",
    },
    {
      name: "Learning",
      path: "/learning",
      icon: "📚",
    },
    {
      name: "Game",
      path: "/game",
      icon: "🎮",
    },
    {
      name: "Progress",
      path: "/progress",
      icon: "📊",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
    {
      name: "Feedback",
      path: "/feedback",
      icon: "💬",
    },
  ];

  return (
    <nav className="main-navbar">

      {/* BRAND */}
      <Link to="/" className="navbar-brand">

        <span className="navbar-brand-icon">
          🤟
        </span>

        <span>
          Silent<span>Sync</span>
        </span>

      </Link>


      {/* NAVIGATION */}
      <div className="navbar-links">

        {navItems.map((item) => {

          const isActive =
            location.pathname === item.path ||
            (
              item.path !== "/" &&
              location.pathname.startsWith(
                item.path
              )
            );

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar-link ${
                isActive ? "active" : ""
              }`}
            >

              <span className="navbar-link-icon">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>

            </Link>
          );

        })}

      </div>


      {/* PROFILE */}
      <Link
        to="/profile"
        className="navbar-profile"
      >

        <div className="navbar-avatar">
          👤
        </div>

        <div className="navbar-profile-text">

          <strong>
            Learner
          </strong>

          <small>
            My Profile
          </small>

        </div>

      </Link>

    </nav>
  );
}

export default Navbar;
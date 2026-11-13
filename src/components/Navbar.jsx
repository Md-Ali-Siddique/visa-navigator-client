import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { FaMoon, FaSun } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { toast } from "react-toastify";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 text-lg sm:text-2xl font-extrabold font-display">
    <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary" />
      <path d="M16 6l3 10-3 10-3-10z" className="fill-accent" />
      <circle cx="16" cy="16" r="2" className="fill-base-100" />
    </svg>
    <span>Visa Navigator</span>
  </Link>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You have been logged out.");
    } catch {
      toast.error("Could not log out. Please try again.");
    }
  };

  const linkClass = ({ isActive }) => (isActive ? "font-semibold text-primary" : "");

  const links = (
    <>
      <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
      <li><NavLink to="/all-visas" className={linkClass}>All Visas</NavLink></li>
      <li><NavLink to="/add-visa" className={linkClass}>Add Visa</NavLink></li>
      <li><NavLink to="/my-added-visas" className={linkClass}>My Added Visas</NavLink></li>
      <li><NavLink to="/my-visa-applications" className={linkClass}>My Visa Applications</NavLink></li>
    </>
  );

  return (
    <header className="bg-base-100/90 backdrop-blur border-b border-base-300 sticky top-0 z-40">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" aria-label="Open menu">
              ☰
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-56 border border-base-300">
              {links}
            </ul>
          </div>
          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
        </div>

        <div className="navbar-end gap-2">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle dark and light theme"
          >
            {theme === "visa-light" ? <FaMoon /> : <FaSun />}
          </button>

          {user ? (
            <>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Profile"}
                  referrerPolicy="no-referrer"
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={user.displayName || user.email}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={user.displayName || user.email}
                  className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold"
                >
                  {(user.displayName || user.email || "?").charAt(0).toUpperCase()}
                </div>
              )}
              <Tooltip id="user-tooltip" />
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-outline btn-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

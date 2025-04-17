import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/foods" className="nav-link">
          All Foods
        </NavLink>
      </li>
      <li>
        <NavLink to="/gallery" className="nav-link">
          Gallery
        </NavLink>
      </li>
      {user ? (
        <li>
          <NavLink to="/add-food" className="nav-link">
            Add Food
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/aboutus" className="nav-link">
            About Us
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/contract" className="nav-link">
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-green-200 dark:bg-gray-900 fixed w-full z-50 shadow-md transition-all duration-300">
      <div className="navbar w-[92%] mx-auto py-2 flex items-center justify-between">
        {/* Left: Brand + Dropdown */}
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile menu */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-4 bg-base-200 dark:bg-gray-800 rounded-box shadow-xl space-y-2 animate-fade-in w-52"
            >
              {links}
            </ul>
          </div>

          {/* Brand Logo */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-1"
          >
            <span className="text-green-500">Food</span>
            <span className="text-red-400">Store</span>
          </Link>
        </div>

        {/* Center: Nav Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu dark:*:text-white menu-horizontal px-1 gap-3">
            {links}
          </ul>
        </div>

        {/* Right: Theme Toggle + Auth */}
        <div className="navbar-end dark:*:text-white flex items-center gap-3">
          <ThemeToggle />

          {!user ? (
            <Link to="/login">
              <button className="relative group px-4 py-2 text-white font-medium bg-blue-500 rounded-lg overflow-hidden shadow hover:bg-blue-600 transition-all duration-300">
                <span className="absolute inset-0 w-0 h-full bg-purple-500 group-hover:w-full transition-all duration-300 ease-out z-0"></span>
                <span className="relative z-10">Login</span>
              </button>
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                data-tip={user?.displayName || "Profile"}
              >
                <div className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-green-400 overflow-hidden transition-transform duration-300 hover:scale-105">
                  <img
                    src={user?.photoURL}
                    alt="User Profile"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-200 dark:bg-gray-800 rounded-box w-52 space-y-2 animate-fade-in"
              >
                <li>
                  <Link to="/my-foods">My Foods</Link>
                </li>
                <li>
                  <Link to="/my-orders">My Orders</Link>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="mt-2 w-full text-left py-2 px-3 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-600 hover:to-blue-500 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

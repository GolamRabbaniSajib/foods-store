import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/foods"}>All Foods</NavLink>
      </li>
      <li>
        <NavLink to={"/gallery"}>Gallery</NavLink>
      </li>
    </>
  );
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="bg-green-200 dark:bg-gray-900 dark:text-gray-100 fixed z-20 w-full">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl md:text-3xl font-bold">
            <span className="text-green-400">Food</span>
            <span className="text-red-400">Store</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div>
            <ThemeToggle></ThemeToggle>
          </div>
          <div>
            {!user && (
              <li>
                <Link to="/login">
                  <button className="relative group px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg overflow-hidden shadow-md hover:bg-blue-600 transition duration-300">
                    <span className="absolute inset-0 w-0 h-full bg-purple-500 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative z-10">Login</span>
                  </button>
                </Link>
              </li>
            )}
            {user && (
              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div title={user?.displayName} className="w-10 rounded-full">
                    <img
                      referrerPolicy="no-referrer"
                      alt="User Profile Photo"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-48"
                >
                  <li>
                    <Link to="/add-food" className="justify-between">
                      Add food
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-foods">My Foods</Link>
                  </li>
                  <li>
                    <Link to="/my-orders">My Orders</Link>
                  </li>
                  <li className="mt-2">
                    <button
                      onClick={logOut}
                      className="bg-gray-200 block text-center"
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
    </div>
  );
};

export default Navbar;

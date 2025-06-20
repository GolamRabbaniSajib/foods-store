import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import logo from "../assets/2.png";

// --- Hook: Click outside ---
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  useClickOutside(profileDropdownRef, () => setIsProfileOpen(false));

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/foods", label: "All Foods" },
    { to: "/gallery", label: "Gallery" },
    ...(user
      ? [
          { to: "/my-foods", label: "My Added Foods" },
          { to: "/my-orders", label: "My Orders" },
        ]
      : [{ to: "/aboutus", label: "About Us" }]),
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20 },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* --- Logo --- */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Food<span className="text-green-500">Store</span>
            </span>
          </Link>

          {/* --- Desktop Nav --- */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className="relative px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="active-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* --- Right Side --- */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {user ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={isProfileOpen}
                >
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-green-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
                  />
                  <FiChevronDown
                    className={`text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                      role="menu"
                    >
                      <div className="py-1">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {user.displayName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          to="/add-food"
                          onClick={() => setIsProfileOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          Add a Food Item
                        </Link>
                        <button
                          onClick={() => {
                            logOut();
                            setIsProfileOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                          role="menuitem"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <button className="px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors shadow-md hover:shadow-lg">
                  Login
                </button>
              </Link>
            )}

            {/* --- Mobile Menu Button --- */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Open mobile menu"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-0 left-0 w-full max-w-xs h-full bg-white dark:bg-gray-900 shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
              role="menu"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold dark:text-white">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label="Close mobile menu"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              <ul className="space-y-4">
                {navLinks.map(({ to, label }) => (
                  <motion.li key={to} variants={mobileLinkVariants}>
                    <NavLink
                      to={to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          isActive
                            ? "bg-green-500 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`
                      }
                      role="menuitem"
                    >
                      {label}
                    </NavLink>
                  </motion.li>
                ))}
                {!user && (
                  <motion.li variants={mobileLinkVariants}>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center px-4 py-3 rounded-lg text-base font-medium bg-green-500 text-white hover:bg-green-600"
                      role="menuitem"
                    >
                      Login
                    </Link>
                  </motion.li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

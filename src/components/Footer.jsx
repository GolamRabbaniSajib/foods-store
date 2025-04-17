import { Link } from "react-router-dom";
import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer border-t footer-center bg-green-200 dark:bg-gray-900 dark:text-gray-100 text-base-content rounded p-10">
      {/* Logo */}
      <div>
        <p className="text-4xl md:text-6xl font-semibold">
          <span className="text-green-400">FOOD</span>{" "}
          <span className="text-red-400">STORE</span>
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="grid grid-flow-col gap-4 text-lg font-medium">
        <Link to="/aboutus" className="link link-hover">
          About us
        </Link>
        <Link to="/contract" className="link link-hover">
          Contact
        </Link>
        <Link to="/job" className="link link-hover">
          Jobs
        </Link>
        <Link to="/press" className="link link-hover">
          Press kit
        </Link>
      </nav>

      {/* Social Icons */}
      <nav>
        <div className="flex gap-6 text-2xl">
          <a href="#" aria-label="Twitter" className="hover:text-green-500">
            <FaTwitter />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-red-500">
            <FaYoutube />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-500">
            <FaFacebookF />
          </a>
        </div>
      </nav>

      {/* Copyright */}
      <aside className="mt-4">
        <p>
          © {new Date().getFullYear()} - All rights reserved by{" "}
          <span className="text-green-400 font-black">Food </span>
          <span className="text-red-400 font-bold">Store</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;

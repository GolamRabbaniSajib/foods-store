import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';

// ES6 Arrow Function for a reusable component
const SocialIcon = ({ href, icon: Icon, 'aria-label': ariaLabel, hoverColor }) => (
  <motion.a
    href={href}
    aria-label={ariaLabel}
    whileHover={{ scale: 1.2, y: -3, color: hoverColor }}
    whileTap={{ scale: 0.95 }}
    className="text-gray-500 dark:text-gray-400 transition-colors duration-300"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="text-2xl" />
  </motion.a>
);

// ES6 Arrow Function for a reusable component
const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
);

// Main Footer component using ES6 syntax
const Footer = () => {
  // useState and useEffect for the live clock
  const [timeInBD, setTimeInBD] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      // Options for formatting time in Bangladesh (Asia/Dhaka timezone)
      const options = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formattedTime = new Date().toLocaleTimeString('en-US', options);
      setTimeInBD(formattedTime);
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  // const for the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="w-[92%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Column 1: Brand and Socials */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <Link to="/" className="text-3xl font-extrabold tracking-tight">
              <span className="text-green-500">Food</span>
              <span className="text-red-400">Store</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Delivering happiness, one meal at a time. Quality food, quick service.
            </p>
            <div className="flex justify-center md:justify-start gap-5 pt-2">
              <SocialIcon href="#" icon={FaTwitter} aria-label="Twitter" hoverColor="#1DA1F2" />
              <SocialIcon href="#" icon={FaYoutube} aria-label="YouTube" hoverColor="#FF0000" />
              <SocialIcon href="#" icon={FaFacebookF} aria-label="Facebook" hoverColor="#1877F2" />
            </div>
          </div>

          {/* Navigation Columns Container */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <FooterLink to="/aboutus">About Us</FooterLink>
                <FooterLink to="/press">Press</FooterLink>
                <FooterLink to="/jobs">Careers</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-2">
                <FooterLink to="/contract">Contact</FooterLink>
                <FooterLink to="/faq">FAQ</FooterLink>
                <FooterLink to="/terms">Terms</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                <FooterLink to="/cookies">Cookie Policy</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Live Time */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center text-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {/* Template Literal for the year */}
            &copy; {currentYear} - All rights reserved by{' '}
            <span className="font-bold text-green-500">Food</span>
            <span className="font-bold text-red-400">Store</span>.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span>Time in Bangladesh: </span>
            <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">{timeInBD}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(Footer);

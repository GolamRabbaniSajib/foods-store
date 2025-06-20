import React from "react";
import { motion } from "framer-motion";
import {
  FiCookie,
  FiCheckShield,
  FiBarChart,
  FiGift,
  FiSettings,
  FiMessageSquare,
} from "react-icons/fi";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

// --- Reusable Cookie Info Card ---
const CookieCard = ({ icon: Icon, title, description }) => (
  <motion.article
    variants={itemVariants}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center cursor-pointer select-none"
    tabIndex={0}
    role="group"
    aria-label={title}
  >
    <div
      className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-5"
      role="img"
      aria-label={`${title} icon`}
    >
      <Icon className="h-8 w-8 text-green-600 dark:text-green-400" aria-hidden="true" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.article>
);

// --- Main Cookie Policy Page ---
const CookiePolicyPage = () => {
  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen py-16 sm:py-24">
      <motion.div
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header variants={itemVariants} className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
            Our Recipe for a Better Experience
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Learn how we use cookies to make your visit to Food Store smoother, safer, and more delicious.
          </p>
          <p className="mt-2 text-sm text-gray-500">Last Updated: June 21, 2025</p>
        </motion.header>

        {/* What are Cookies? */}
        <motion.section
          variants={itemVariants}
          className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-8"
          aria-labelledby="what-are-cookies"
        >
          <FiCookie
            className="w-16 h-16 md:w-24 md:h-24 text-green-500 flex-shrink-0"
            aria-hidden="true"
          />
          <div>
            <h2
              id="what-are-cookies"
              className="text-3xl font-bold text-gray-900 dark:text-white mb-3"
            >
              So, what's a cookie?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Think of a cookie as a small digital note that our website gives your browser. It helps
              us remember you and your preferences—like keeping items in your cart between visits or
              remembering that you're logged in. It's a key ingredient for a seamless online
              experience.
            </p>
          </div>
        </motion.section>

        {/* Types of Cookies We Use */}
        <motion.section variants={itemVariants} className="mb-16" aria-labelledby="types-of-cookies">
          <h2
            id="types-of-cookies"
            className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white"
          >
            The Types of Cookies We Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CookieCard
              icon={FiCheckShield}
              title="Essential Cookies"
              description="These are vital for the site to work. They handle things like your shopping cart and secure login."
            />
            <CookieCard
              icon={FiBarChart}
              title="Performance Cookies"
              description="These help us understand how you use our site, so we can fix bugs and improve performance."
            />
            <CookieCard
              icon={FiGift}
              title="Functional Cookies"
              description="These remember your choices (like your location) to give you a more personal and convenient visit."
            />
          </div>
        </motion.section>

        {/* Your Control */}
        <motion.section variants={itemVariants} className="text-center mb-16" aria-labelledby="your-control">
          <div
            className="inline-block bg-white dark:bg-gray-800 p-6 rounded-full shadow-lg mb-4"
            aria-hidden="true"
          >
            <FiSettings className="h-10 w-10 text-green-500" />
          </div>
          <h2 id="your-control" className="text-3xl font-bold text-gray-900 dark:text-white">
            You Are in Control
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your privacy is important. Most web browsers allow you to see, manage, and delete
            cookies. While disabling essential cookies may affect site functionality, you have full
            control over your settings through your browser.
          </p>
        </motion.section>

        {/* Formal Policy & Contact */}
        <motion.section
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12"
          aria-labelledby="official-fine-print"
        >
          <h2
            id="official-fine-print"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
          >
            The Official Fine Print
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            For a detailed legal description of our practices, please refer to our full policy. This
            policy is governed by the laws of Bangladesh. By continuing to use our site, you are
            agreeing to our use of cookies as described.
          </p>
          <div className="flex items-center gap-4">
            <FiMessageSquare className="h-6 w-6 text-green-500" aria-hidden="true" />
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                Have questions? Contact our support team at
              </p>
              <a
                href="mailto:support@foodstore.com.bd"
                className="font-semibold text-green-600 dark:text-green-400 hover:underline"
              >
                support@foodstore.com.bd
              </a>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
};

export default CookiePolicyPage;

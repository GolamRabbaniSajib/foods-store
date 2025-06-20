import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/2.png";
import { FaLeaf, FaHandshake, FaLock, FaStar } from "react-icons/fa";

// Data abstraction
const values = [
  {
    icon: FaLeaf,
    title: "Freshness & Quality",
    description: "We are committed to sourcing the freshest ingredients and highest quality products for your table.",
  },
  {
    icon: FaHandshake,
    title: "Customer Trust",
    description: "Your satisfaction is our priority. We build lasting relationships based on trust and reliability.",
  },
  {
    icon: FaLock,
    title: "Secure & Convenient",
    description: "Enjoy a seamless and secure shopping experience with our robust and user-friendly platform.",
  },
  {
    icon: FaStar,
    title: "Exceptional Experience",
    description: "We strive to provide a dynamic and delightful journey from browse to checkout.",
  },
];

// Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// Reusable value card component
const ValueCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
    variants={itemVariants}
    whileHover={{
      y: -10,
      boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)",
    }}
  >
    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-5">
      <Icon className="h-8 w-8 text-green-600 dark:text-green-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

const AboutUs = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen py-16 sm:py-24">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
            Crafting Culinary Experiences
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the passion and dedication behind your favorite food destination.
          </p>
        </motion.div>

        {/* Story section */}
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-20 mb-24">
          {/* Image */}
          <motion.div
            className="w-full md:w-5/12"
            variants={itemVariants}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          >
            <img
              src={logo}
              alt="Restaurant interior"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
          </motion.div>

          {/* Text */}
          <motion.div className="w-full md:w-7/12" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Welcome to <span className="font-bold text-green-600 dark:text-green-400">Food Store</span>! Our journey
              began with a simple idea: to make high-quality, delicious food accessible to everyone. We are a team of
              food lovers passionate about connecting people with exceptional culinary products, all from the comfort
              of home.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We've built a platform that combines seamless navigation with dynamic features, ensuring every visit is a
              delightful discovery. Our mission is to be your most trusted and cherished online food marketplace.
            </p>
          </motion.div>
        </div>

        {/* Values section */}
        <motion.div variants={itemVariants}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Our Core Values</h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">The principles that guide everything we do.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <ValueCard key={i} {...value} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;

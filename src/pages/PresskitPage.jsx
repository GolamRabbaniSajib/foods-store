import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/2.png";
import { FiDownload, FiUser, FiMail, FiPhone } from "react-icons/fi";

// --- Media Assets ---
const pressAssets = [
  {
    title: "Logo Pack",
    description: "Our official logo in various formats (SVG, PNG) for light and dark backgrounds.",
    previewImage: logo,
    downloadUrl: "/downloads/food-store-logo-pack.zip",
  },
  {
    title: "Product Photography",
    description: "High-resolution images of our signature dishes and products.",
    previewImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
    downloadUrl: "/downloads/product-photos.zip",
  },
  {
    title: "Brand Guidelines",
    description: "A comprehensive PDF detailing our brand colors, typography, and usage.",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    downloadUrl: "/downloads/brand-guidelines.pdf",
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

// --- Reusable Media Card ---
const MediaCard = ({ title, description, previewImage, downloadUrl }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col"
  >
    <img src={previewImage} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{description}</p>
      <a
        href={downloadUrl}
        download
        className="mt-auto inline-flex items-center justify-center gap-2 w-full bg-green-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
      >
        <FiDownload /> Download
      </a>
    </div>
  </motion.div>
);

// --- Reusable Contact Item ---
const ContactItem = ({ icon: Icon, label, value, link }) => (
  <div className="flex items-center gap-4">
    <Icon className="w-6 h-6 text-green-500" />
    <p className="text-lg">
      <span className="font-bold text-gray-900 dark:text-white">{label}:</span>{" "}
      {link ? (
        <a href={link} className="text-green-600 dark:text-green-400 hover:underline">
          {value}
        </a>
      ) : (
        <span className="text-gray-700 dark:text-gray-300">{value}</span>
      )}
    </p>
  </div>
);

// --- Main Component ---
const PressKitPage = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen py-16 sm:py-24">
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Header --- */}
        <motion.header variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
            Press & Media
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Welcome to the Food Store press kit. All the resources you need to write about us are right here.
          </p>
        </motion.header>

        {/* --- Company Overview --- */}
        <motion.section variants={itemVariants} className="mb-20">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Company Overview</h2>
          <div className="text-lg text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
            <p>
              <span className="font-bold text-green-600 dark:text-green-400">Food Store</span> is a premier online
              platform where customers can explore and purchase a wide variety of delicious foods. With dynamic
              features, seamless navigation, and secure transactions, we ensure a convenient and enjoyable shopping
              experience for food lovers everywhere.
            </p>
            <p>
              Established in 2023 in Bangladesh, we have been committed to delivering high-quality food items and
              ensuring absolute customer satisfaction from day one.
            </p>
          </div>
        </motion.section>

        {/* --- Media Assets --- */}
        <motion.section variants={itemVariants} className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Media Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressAssets.map((asset) => (
              <MediaCard key={asset.title} {...asset} />
            ))}
          </div>
        </motion.section>

        {/* --- Contact Info --- */}
        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Media Contact</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-lg mx-auto space-y-4">
            <ContactItem icon={FiUser} label="Name" value="Sajib" />
            <ContactItem icon={FiMail} label="Email" value="press@foodstore.com" link="mailto:press@foodstore.com" />
            <ContactItem icon={FiPhone} label="Phone" value="+880 1234-567890" />
          </div>
        </motion.section>
      </motion.div>
    </section>
  );
};

export default PressKitPage;

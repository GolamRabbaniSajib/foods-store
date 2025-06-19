import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bannerImage from "../assets/banner.avif";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const Banner = () => {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] bg-gray-900 overflow-hidden">
      {/* Background Image with zoom animation */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-5xl mx-auto text-center py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            <span className="text-emerald-400">Taste the Tradition,</span>
            <span className="block mt-1 md:mt-2">Feel the Innovation.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-light text-gray-200"
          >
            Explore a world of culinary delights. Find your next favorite meal or
            share your own masterpiece with our vibrant community.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10">
            <Link to="/foods">
              <motion.button
                className="px-8 py-3 text-lg font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/50 transition"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                Explore All Foods
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;

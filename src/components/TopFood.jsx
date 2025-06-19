import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi"; // For the "See All" button

// --- Skeleton Loader Component ---
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse">
    <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
    <div className="p-5">
      <div className="h-6 rounded-md bg-gray-300 dark:bg-gray-700 w-3/4 mx-auto mb-4"></div>
      <div className="h-4 rounded-md bg-gray-300 dark:bg-gray-700 w-full mb-2"></div>
      <div className="h-4 rounded-md bg-gray-300 dark:bg-gray-700 w-5/6"></div>
      <div className="mt-6 h-10 w-28 mx-auto rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </div>
  </div>
);

// --- Main TopFood Component ---
const TopFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopFoods = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/top-foods`
        );
        setFoods(data);
      } catch (err) {
        console.error("Failed to fetch top foods:", err);
      } finally {
        // Simulate a slightly longer load time to showcase the skeleton loader
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchTopFoods();
  }, []);

  // Framer Motion Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-20">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Our Top Selling Dishes
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the dishes that our customers love the most. Hand-picked
            for you.
          </p>
        </motion.div>

        {/* Content: Skeleton or Food Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Displaying 4 skeleton cards for a better visual representation */}
            {[...Array(4)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {foods.map((food) => (
              <motion.div
                key={food._id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.03 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative">
                  <img
                    src={food.foodImage}
                    alt={food.foodName}
                    className="w-full h-48 object-cover transition-transform duration-300"
                  />
                  <span className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {food.foodCategory}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {food.foodName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
                    {food.description}
                  </p>
                  <div className="mt-auto flex justify-between items-center">
                    <p className="text-lg font-bold text-emerald-500">
                      ${food.price}
                    </p>
                    <Link
                      to={`/food/${food._id}`}
                      className="px-5 py-2 bg-emerald-500 text-white rounded-full text-sm font-semibold hover:bg-emerald-600 transition-colors duration-300"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        {!loading && (
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link
              to="/foods"
              className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-emerald-500 text-emerald-500 rounded-full text-lg font-bold hover:bg-emerald-500 hover:text-white transition-all duration-300 group"
            >
              See All Foods
              <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TopFood;
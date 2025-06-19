import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { IoSearchSharp, IoPricetagsOutline } from "react-icons/io5";
import { GiWorld } from "react-icons/gi";
import { TbShoppingBag } from "react-icons/tb";

import foodBgImage from "../assets/allfoodbg.avif";

// Skeleton loader card
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse">
    <div className="w-full h-48 bg-gray-300 dark:bg-gray-700" />
    <div className="p-5 space-y-4">
      <div className="h-6 rounded-md bg-gray-300 dark:bg-gray-700 w-3/4" />
      <div className="h-4 rounded-md bg-gray-300 dark:bg-gray-700 w-full" />
      <div className="h-4 rounded-md bg-gray-300 dark:bg-gray-700 w-5/6" />
      <div className="h-10 rounded-lg bg-gray-300 dark:bg-gray-700" />
    </div>
  </div>
);

// Debounce hook to prevent re-creating debounce every render
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  const debouncedFn = useCallback(
    (...args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );

  // Clear timeout on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return debouncedFn;
};

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch foods function
  const fetchAllFoods = useCallback(async (searchQuery) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods?search=${encodeURIComponent(searchQuery)}`
      );
      setFoods(data);
    } catch (error) {
      console.error("Failed to fetch foods:", error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced version of fetchAllFoods
  const debouncedFetch = useDebounce(fetchAllFoods, 300);

  useEffect(() => {
    debouncedFetch(searchTerm);
  }, [searchTerm, debouncedFetch]);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" } },
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Helmet>
        <title>Foodie | All Foods</title>
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-80 flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${foodBgImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          className="relative z-10 text-center space-y-5 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
            Explore Our Culinary World
          </h1>
          <p className="text-lg text-gray-200">Find your next favorite dish.</p>
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by food name..."
              className="w-full px-5 py-3 rounded-full border-2 border-transparent text-gray-800 focus:outline-none focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 transition-all pr-12"
              aria-label="Search foods by name"
            />
            <IoSearchSharp className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400 pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* Food Grid Section */}
      <main className="w-11/12 max-w-7xl mx-auto py-12 sm:py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : foods.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {foods.map((food) => (
              <motion.article
                key={food._id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
                aria-label={`${food.foodName} - ${food.category} from ${food.foodOrigin}`}
              >
                <div className="relative">
                  <img
                    src={food.foodImage}
                    alt={food.foodName}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md select-none">
                    {food.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {food.foodName}
                  </h2>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                    <p className="flex items-center gap-2">
                      <GiWorld className="text-amber-500" aria-hidden="true" />
                      <strong>Origin:</strong> {food.foodOrigin}
                    </p>
                    <p className="flex items-center gap-2">
                      <IoPricetagsOutline className="text-amber-500" aria-hidden="true" />
                      <strong>Price:</strong> ${food.price}
                    </p>
                  </div>
                  <Link to={`/food/${food._id}`} className="mt-auto">
                    <button
                      className="w-full bg-amber-500 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center gap-2"
                      aria-label={`Purchase ${food.foodName}`}
                    >
                      <TbShoppingBag aria-hidden="true" />
                      Purchase
                    </button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <section className="col-span-full text-center py-20" role="alert" aria-live="polite">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">No Foods Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Try adjusting your search or check back later.
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

export default AllFoods;
